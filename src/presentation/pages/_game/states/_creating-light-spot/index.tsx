import { FC, useEffect } from 'react';

import { useDice, useGame, useNavigate, usePlayer } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { useCreateLightSpotToast, useRollDiceToast } from './hooks';

import {
  CentralFact,
  DiceRoller,
  Dices,
  Map,
  Pulses,
  Questions,
  RollDiceEvent,
  Round,
  Subjects,
} from '../../components';

export const CreatingLightSpotState: FC = () => {
  const { currentGame } = useGame();
  const { isMyLightSpotTurn } = usePlayer();
  const { currentLightSpotDice, rollCurrentLightSpotDice } = useDice();

  const [, state] = currentGame?.state ?? [];

  const handleRollDice = (event: RollDiceEvent) => {
    rollCurrentLightSpotDice(event.position).catch(alertError);
  };

  const { navigateToSubject } = useNavigate();

  useEffect(() => {
    if (!isMyLightSpotTurn) return;
    if (state !== 'create:subject') return;

    navigateToSubject();
  }, [isMyLightSpotTurn, state]);

  useRollDiceToast();
  useCreateLightSpotToast();

  const isRollDiceState =
    isMyLightSpotTurn && state === 'roll:dice' && currentLightSpotDice;

  return (
    <Map>
      <Pulses />
      <Dices
        transparent
        hidden={isRollDiceState ? currentLightSpotDice.id : undefined}
      />
      <Subjects />
      <CentralFact />
      <Questions />
      <Round />

      {isRollDiceState && (
        <DiceRoller dice={currentLightSpotDice} onRollDice={handleRollDice} />
      )}
    </Map>
  );
};
