import { FC, useEffect, useRef } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralFact,
  useCentralPulse,
  useDice,
  useGame,
  usePlayer,
  useStates,
  useSubject,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  CentralFact,
  CentralFactForm,
  Dice,
  DiceRoller,
  Dices,
  Map,
  Pulses,
  Subjects,
} from '../../components';

export const CreatingCentralFactState: FC = () => {
  const { myPlayer, currentPlayer } = usePlayer();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { currentDice, rollCurrentDice } = useDice();
  const { centralPulse } = useCentralPulse();
  const { centralFact, changeCentralFact } = useCentralFact();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const mapRef = useRef<Map.Ref>(null);

  const [s] = useStates({
    dicePosition: mySubject?.position ?? null,
    dicePositioned: false,
  });

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  function handleSubmitButtonClick(data: CentralFactForm.FormData) {
    changeCentralFact({ description: data.description }).catch(alertError);

    mapRef.current?.closeBakingPaper();
  }

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

  useEffect(() => {
    if (!isMyTurn || state !== 'change:centralFact') return;

    mapRef.current?.openBakingPaper(
      <CentralFactForm
        defaultValues={{ description: centralFact?.description }}
        onSubmit={handleSubmitButtonClick}
      />,
    );
  }, [isMyTurn, state]);

  const isRollDiceState = isMyTurn && state === 'roll:dice' && currentDice;

  if (!currentGame) return null;

  return (
    <>
      <Map
        ref={mapRef}
        onMouseMove={handleMapMouseMove}
        onClick={handleMapClick}
      >
        <Pulses />
        <Dices
          hidden={isRollDiceState ? currentDice.id : undefined}
          transparent
        />
        <Subjects />
        <CentralFact />

        {isMyTurn &&
          state === 'update:dice:position' &&
          currentDice &&
          s.dicePosition && <Dice {...currentDice} position={s.dicePosition} />}

        {isRollDiceState && (
          <DiceRoller dice={currentDice} onRollDice={handleDiceRoll} />
        )}
      </Map>

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing the central fact...
        </p>
      )}
    </>
  );
};
