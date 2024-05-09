import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralPulse,
  useDice,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useSubject,
  useToast,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  useChangeCentralFactToast,
  useRollDiceToast,
  useUpdateDicePositionToast,
} from './hooks';

import {
  CentralFact,
  Dice,
  DiceRoller,
  Dices,
  Map,
  Pulses,
  Subjects,
} from '../../components';

const toastID = 'creating-central-fact';

export const CreatingCentralFactState: FC = () => {
  const { isMyTurn, turnIsSafe } = usePlayer();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { currentDice, rollCurrentDice } = useDice();
  const { centralPulse } = useCentralPulse();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const [s] = useStates({
    dicePosition: mySubject?.position ?? null,
    dicePositioned: false,
  });

  function handleMapMouseMove(vector: Vector) {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!centralPulse) return;
    if (!currentDice?.value) return;
    if (s.dicePositioned) return;

    s.dicePosition = vector.norm().mult(currentDice.value);
  }

  function handleMapClick() {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!currentDice) return;
    if (!s.dicePosition) return;

    const { dicePosition } = s;

    s.dicePosition = null;
    s.dicePositioned = true;

    changeMySubjectPosition(dicePosition).catch(alertError);
  }

  function handleDiceRoll() {
    rollCurrentDice().catch(alertError);
  }

  const { navigateToCentralFact } = useNavigate();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (!isMyTurn) return;
    if (state !== 'change:centralFact') return;

    navigateToCentralFact();
  }, [turnIsSafe, isMyTurn, state]);

  const toast = useToast();

  useChangeCentralFactToast();
  useRollDiceToast();
  useUpdateDicePositionToast();

  useEffect(() => () => toast.dismiss(toastID), []);

  const isRollDiceState = isMyTurn && state === 'roll:dice' && currentDice;
  const isUpdateDicePositionState =
    isMyTurn &&
    state === 'update:dice:position' &&
    currentDice &&
    s.dicePosition;

  return (
    <Map onMouseMove={handleMapMouseMove} onClick={handleMapClick}>
      <Pulses />
      <Dices
        hidden={isRollDiceState ? currentDice.id : undefined}
        transparent
      />
      <Subjects />
      <CentralFact />

      {isRollDiceState && (
        <DiceRoller dice={currentDice} onRollDice={handleDiceRoll} />
      )}

      {isUpdateDicePositionState && (
        <Dice {...currentDice} position={s.dicePosition} />
      )}
    </Map>
  );
};
