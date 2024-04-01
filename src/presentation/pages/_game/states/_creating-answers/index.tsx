import { FC } from 'react';

import { useGameUsecases } from '@presentation/contexts';

import {
  Dices,
  Map,
  PlayersList,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

export const CreatingAnswersState: FC = () => {
  const { currentGame } = useGameUsecases();

  if (!currentGame) return null;

  return (
    <>
      <Map>
        <Pulses />
        <Subjects />
        <Dices transparent />
        <Questions />
      </Map>

      <PlayersList />
    </>
  );
};
