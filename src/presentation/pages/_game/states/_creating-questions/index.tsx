import { FC, useMemo } from 'react';

import { Circle, Vector } from '@domain/utils';

import {
  useDiceUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useQuestionUsecases,
  useRoundUsecases,
  useSubjectPulseUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
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

  const { currentPlayer, currentDice } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { rollDice } = useDiceUsecases();
  const { currentGame, nextGameState } = useGameUsecases();
  const { mySubject, changeSubject } = useSubjectUsecases();
  const { subjectPulses, createSubjectPulse } = useSubjectPulseUsecases();

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

  const { createQuestion } = useQuestionUsecases();

  function handleSubmitButtonClick() {
    if (!s.description) return;

    s.creatingQuestion = true;

    // @todo: fill subjectIDs
    createQuestion({ description: s.description, subjectIDs: [] })
      .then(nextGameState)
      .catch(alertError)
      .finally(set('creatingQuestion', false));
  }

  function handleRollDice({ dice }: RollDiceEvent) {
    rollDice(dice.id).then(nextGameState).catch(alertError);
  }

  function handleCreatePulse({ amount, gap, origin }: CreatePulseEvent) {
    if (!mySubject) return;

    createSubjectPulse({ amount, gap, landmarkID: mySubject.id, origin })
      .then(nextGameState)
      .catch(alertError);
  }

  if (!currentGame) return null;

  return (
    <>
      <Map
        onClick={() => {
          if (!s.selectedCrossing || !mySubject) return;

          changeSubject(mySubject.id, { position: s.selectedCrossing })
            .then(nextGameState)
            .catch(alertError);
        }}
      >
        <Pulses />
        <Subjects />
        <Dices transparent />
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
        <p className='legend handwriting'>
          {currentPlayer.name} is writing a question...
        </p>
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
