import { FC, useMemo } from 'react';

import { Circle, Vector } from '@domain/utils';

import { P } from '@presentation/components';
import {
  useDice,
  useGame,
  usePlayer,
  useQuestion,
  useStates,
  useSubject,
  useSubjectPulse,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  CentralFact,
  CreatePulseEvent,
  Crossings,
  DiceRoller,
  Dices,
  Map,
  PlayersList,
  PulseCreator,
  Pulses,
  Questions,
  RollDiceEvent,
  Subjects,
} from '../../components';

import { Container } from './styles';

export const CreatingQuestionsState: FC = () => {
  const [s, set] = useStates({
    description: '',
    creatingQuestion: false,
    selectedCrossing: null as Vector | null,
  });

  const { myPlayer, currentPlayer } = usePlayer();
  const { currentDice, rollDice } = useDice();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { subjectPulses, createSubjectPulse } = useSubjectPulse();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const submitDisabled = !s.description;

  const currentSubjectPulse = useMemo(
    () => subjectPulses.find((value) => value.landmarkID === mySubject?.id),
    [subjectPulses, mySubject],
  );

  const targetCircle = useMemo(
    () =>
      currentSubjectPulse &&
      new Circle(
        currentSubjectPulse.origin,
        currentSubjectPulse.amount * currentSubjectPulse.gap,
      ),
    [currentSubjectPulse],
  );

  const { createQuestion } = useQuestion();

  async function handleSubmitButtonClick() {
    if (!s.description || !currentDice) return;

    s.creatingQuestion = true;

    // @todo: fill subjectIDs
    createQuestion({
      description: s.description,
      subjectIDs: [],
    })
      .catch(alertError)
      .finally(set('creatingQuestion', false));
  }

  function handleRollDice({ dice }: RollDiceEvent) {
    rollDice(dice.id).catch(alertError);
  }

  function handleCreatePulse({ amount, gap, origin }: CreatePulseEvent) {
    if (!mySubject) return;

    createSubjectPulse({ amount, gap, landmarkID: mySubject.id, origin }).catch(
      alertError,
    );
  }

  if (!currentGame) return null;

  return (
    <>
      <Map
        onClick={() =>
          s.selectedCrossing &&
          changeMySubjectPosition(s.selectedCrossing).catch(alertError)
        }
      >
        <Pulses />
        <Subjects />
        <Dices transparent />
        <CentralFact />
        <Questions />

        {isMyTurn && state === 'roll:dice' && (
          <DiceRoller onRollDice={handleRollDice} />
        )}

        {isMyTurn &&
          state === 'create:subjectPulse' &&
          currentDice?.value &&
          mySubject?.position && (
            <PulseCreator
              origin={mySubject.position}
              amount={currentDice.value}
              color={currentPlayer.color}
              onCreatePulse={handleCreatePulse}
            />
          )}

        {isMyTurn && state === 'update:dice:position' && targetCircle && (
          <Crossings
            targetCircle={targetCircle}
            onSelectCrossing={set('selectedCrossing')}
          />
        )}
      </Map>

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <P className='legend handwriting'>
          {currentPlayer.name} is writing a question...
        </P>
      )}

      {isMyTurn && state === 'create:question' && (
        <Container>
          <article className='modal' onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>Create question</h2>
            </header>

            <main>
              <textarea
                autoFocus
                defaultValue={s.description}
                onChange={(e) => (s.description = e.target.value)}
              />
            </main>

            <footer>
              <button
                disabled={submitDisabled}
                onClick={handleSubmitButtonClick}
              >
                {s.creatingQuestion && (
                  <>
                    <span className='loading'>⏳</span>{' '}
                  </>
                )}
                Create
              </button>
            </footer>
          </article>
        </Container>
      )}
    </>
  );
};
