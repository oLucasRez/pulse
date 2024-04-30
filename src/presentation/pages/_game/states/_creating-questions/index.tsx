import { FC, useEffect, useMemo, useRef } from 'react';

import { Circle, Vector } from '@domain/utils';

import { P } from '@presentation/components';
import {
  useDice,
  useGame,
  useGetSubjectsByCrossing,
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
  PulseCreator,
  Pulses,
  QuestionForm,
  Questions,
  Subjects,
} from '../../components';

export const CreatingQuestionsState: FC = () => {
  const [s, set] = useStates({
    creatingQuestion: false,
    selectedCrossing: null as Vector | null,
  });

  const { isMyTurn, currentPlayer } = usePlayer();
  const { currentDice, rollCurrentDice } = useDice();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { subjectPulses, createSubjectPulse } = useSubjectPulse();
  const { createQuestion } = useQuestion();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const mapRef = useRef<Map.Ref>(null);

  const currentSubjectPulse = useMemo(
    () => subjectPulses.find(({ id }) => id === mySubject?.pulseIDs[0]),
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

  const getSubjectsByCrossing = useGetSubjectsByCrossing();

  async function handleSubmitButtonClick(data: QuestionForm.FormData) {
    createQuestion({
      description: data.description,
    }).catch(alertError);

    mapRef.current?.closeBakingPaper();
  }

  useEffect(() => {
    if (
      !isMyTurn ||
      state !== 'create:question' ||
      !currentPlayer ||
      !currentDice?.position
    )
      return;

    mapRef.current?.openBakingPaper(
      <QuestionForm
        subjects={getSubjectsByCrossing(currentDice.position)}
        color={currentPlayer.color}
        onSubmit={handleSubmitButtonClick}
      />,
    );
  }, [isMyTurn, state, !currentPlayer, !currentDice?.position]);

  function handleRollDice() {
    rollCurrentDice().catch(alertError);
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
        ref={mapRef}
        onClick={() =>
          s.selectedCrossing &&
          changeMySubjectPosition(s.selectedCrossing).catch(alertError)
        }
      >
        <Pulses />
        <Dices transparent />
        <Subjects />
        <CentralFact />
        <Questions />

        {isMyTurn && state === 'roll:dice' && currentDice && (
          <DiceRoller dice={currentDice} onRollDice={handleRollDice} />
        )}

        {isMyTurn &&
          state === 'create:subjectPulse' &&
          currentDice?.value &&
          mySubject?.position &&
          currentPlayer?.color && (
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

      {!isMyTurn && currentPlayer && (
        <P className='legend handwriting'>
          {currentPlayer.name} is writing a question...
        </P>
      )}
    </>
  );
};
