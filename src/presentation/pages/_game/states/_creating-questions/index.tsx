import { FC } from 'react';

import {
  useDiceUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';

import { Dice, Map, PlayersList } from '../../components';

export const CreatingQuestionsState: FC = () => {
  const { currentPlayer } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { dices } = useDiceUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  return (
    <>
      <Map>
        {dices.map((dice) => (
          <Dice key={dice.id} {...dice} />
        ))}
      </Map>

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing a question...
        </p>
      )}
    </>
  );
};
