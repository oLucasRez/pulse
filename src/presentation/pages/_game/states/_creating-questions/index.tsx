import { FC, useEffect, useMemo } from 'react';

import { Circle, Vector } from '@domain/utils';

import {
  useDice,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useSubject,
  useSubjectPulse,
  useToast,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  useCreateQuestionToast,
  useCreateSubjectPulseToast,
  useRollDiceToast,
  useUpdateDicePositionToast,
} from './hooks';

import {
  CentralFact,
  CreatePulseEvent,
  Crossings,
  DiceRoller,
  Dices,
  Map,
  PulseCreator,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

const toastID = 'creating-questions';

export const CreatingQuestionsState: FC = () => {
  const [s, set] = useStates({
    creatingQuestion: false,
    selectedCrossing: null as Vector | null,
  });

  const { isMyTurn, currentPlayer, turnIsSafe } = usePlayer();
  const { currentDice, rollCurrentDice } = useDice();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { subjectPulses, createSubjectPulse } = useSubjectPulse();

  const [, state] = currentGame?.state ?? [];

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

  const { navigateToInvestigation } = useNavigate();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (!isMyTurn) return;
    if (state !== 'create:question') return;
    if (!currentPlayer) return;

    navigateToInvestigation();
  }, [turnIsSafe, isMyTurn, state, !currentPlayer]);

  useRollDiceToast();
  useCreateSubjectPulseToast();
  useUpdateDicePositionToast();
  useCreateQuestionToast();

  const toast = useToast();

  useEffect(() => () => toast.dismiss(toastID), []);

  function handleRollDice() {
    rollCurrentDice().catch(alertError);
  }

  function handleCreatePulse({ amount, gap, origin }: CreatePulseEvent) {
    if (!mySubject) return;

    createSubjectPulse({ amount, gap, landmarkID: mySubject.id, origin }).catch(
      alertError,
    );
  }

  return (
    <Map
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
  );
};
