import { FC } from 'react';

import {
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';

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
  const { currentPlayer } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  if (!currentGame) return null;

  return (
    <>
      <Map>
        <Pulses />
        <Dices transparent />
        <Subjects />
        <Questions />
      </Map>

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing an answer...
        </p>
      )}
    </>
  );
};
