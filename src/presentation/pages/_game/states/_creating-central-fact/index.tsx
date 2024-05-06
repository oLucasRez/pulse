import { FC, Fragment, useEffect, useRef } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralFact,
  useCentralPulse,
  useDice,
  useGame,
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
  CentralFactForm,
  Dice,
  DiceRoller,
  Dices,
  Map,
  Pulses,
  Subjects,
} from '../../components';

const toastID = 'creating-central-fact';

export const CreatingCentralFactState: FC = () => {
  const { isMyTurn, currentPlayer, turnIsSafe } = usePlayer();
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
    if (!turnIsSafe) return;
    if (!isMyTurn) return;
    if (state !== 'change:centralFact') return;

    mapRef.current?.openBakingPaper(
      <CentralFactForm
        defaultValues={{ description: centralFact?.description }}
        onSubmit={handleSubmitButtonClick}
      />,
    );

    return () => mapRef.current?.closeBakingPaper();
  }, [turnIsSafe, isMyTurn, state]);

  const toast = useToast();

  useChangeCentralFactToast();
  useRollDiceToast();
  useUpdateDicePositionToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (!currentPlayer) return;
    if (state !== 'change:centralFact') return;
    if (!isMyTurn) return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é o <em>Fato Central</em>?
        </>
      ),
      description: (
        <>
          <p>
            O <em>Fato Central</em> é a cena final da nossa história, envolvendo
            todos os Elementos. Lacunas ou questões em aberto serão respondidas
            ao longo do jogo.
          </p>
          <p>
            Seja criativo e ajude a montar uma cena com vários mistérios a serem
            solucionados e com potencial para construir uma história incrível!
          </p>
        </>
      ),
    });
  }, [turnIsSafe, isMyTurn, state]);

  useEffect(() => () => toast.dismiss(toastID), []);

  const isRollDiceState = isMyTurn && state === 'roll:dice' && currentDice;
  const isUpdateDicePositionState =
    isMyTurn &&
    state === 'update:dice:position' &&
    currentDice &&
    s.dicePosition;

  if (!currentGame) return null;

  return (
    <Map ref={mapRef} onMouseMove={handleMapMouseMove} onClick={handleMapClick}>
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
