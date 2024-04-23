import { FC, useEffect, useRef } from 'react';

import { useDice, useGame, usePlayer, useSubject } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  CentralFact,
  DiceRoller,
  Dices,
  Map,
  PlayersList,
  Pulses,
  Questions,
  RollDiceEvent,
  Subjects,
} from '../../components';
import { SubjectForm } from './components';

export const CreatingLightSpotState: FC = () => {
  const { currentGame } = useGame();
  const { isMyLightSpotTurn, currentLightSpotPlayer } = usePlayer();
  const { rollCurrentLightSpotDice } = useDice();
  const { createLightSpotSubject } = useSubject();

  const mapRef = useRef<Map.Ref>(null);

  if (!currentGame) return null;

  const {
    state: [, state],
  } = currentGame;

  const handleRollDice = (event: RollDiceEvent) => {
    rollCurrentLightSpotDice(event.position).catch(alertError);
  };

  function handleCreateSubject(data: SubjectForm.FormData) {
    createLightSpotSubject({
      icon: data.icon,
      color: data.color,
      description: data.description,
    }).catch(alertError);

    mapRef.current?.closeBakingPaper();
  }

  useEffect(() => {
    if (!isMyLightSpotTurn) return;
    if (state !== 'create:subject') return;

    mapRef.current?.openBakingPaper(
      <SubjectForm onSubmit={handleCreateSubject} />,
    );
  }, [isMyLightSpotTurn, state]);

  return (
    <>
      <Map ref={mapRef}>
        <Pulses />
        <Dices transparent />
        <Subjects />
        <CentralFact />
        <Questions />

        {isMyLightSpotTurn && state === 'roll:dice' && (
          <DiceRoller onRollDice={handleRollDice} />
        )}
      </Map>

      <PlayersList />

      {!isMyLightSpotTurn && currentLightSpotPlayer && (
        <p className='legend handwriting'>
          {currentLightSpotPlayer.name} is creating a light-spot...
        </p>
      )}
    </>
  );
};
