import { FC, useEffect, useMemo, useRef } from 'react';

import { Circle, Vector } from '@domain/utils';

import {
  useDice,
  useGame,
  usePlayer,
  useQuestion,
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
  QuestionForm,
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

  async function handleSubmitButtonClick(data: QuestionForm.FormData) {
    createQuestion({
      description: data.description,
    }).catch(alertError);

    mapRef.current?.closeBakingPaper();
  }

  useEffect(() => {
    if (!turnIsSafe) return;
    if (!isMyTurn) return;
    if (state !== 'create:question') return;
    if (!currentPlayer) return;

    mapRef.current?.openBakingPaper(
      <QuestionForm
        color={currentPlayer.color}
        onSubmit={handleSubmitButtonClick}
      />,
    );

    return () => mapRef.current?.closeBakingPaper();
  }, [turnIsSafe, isMyTurn, state, !currentPlayer]);

  useRollDiceToast();
  useCreateSubjectPulseToast();
  useUpdateDicePositionToast();
  useCreateQuestionToast();

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (state !== 'create:question') return;
    if (!isMyTurn) return;

    if (!currentDice?.position) return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é uma <em>Investigação</em>?
        </>
      ),
      description: (
        <>
          <p>
            <em>Investigações</em> são pontos da história que ainda são
            incertos, lacunas no enredo que ainda precisam ser preenchidas.
          </p>
        </>
      ),
    });
  }, [turnIsSafe, isMyTurn, state, !currentDice?.position]);

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

  if (!currentGame) return null;

  return (
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
  );
};
