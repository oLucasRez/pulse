import { FC } from 'react';

import {
  usePlayerUsecases,
  useRoundUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { getColor } from '@presentation/styles/mixins';

import { Container } from './styles';

export const PlayersList: FC = () => {
  const { players } = usePlayerUsecases();
  const { subjects } = useSubjectUsecases();
  const { round, currentPlayer } = useRoundUsecases();

  return (
    <Container id='players-list'>
      {round?.playerIDs.map((playerID) => {
        const isCurrentPlayer = currentPlayer?.id === playerID;

        const subject = subjects.find((value) => value.authorID === playerID);

        const player = players.find((value) => value.id === playerID);
        if (!player) return null;

        return (
          <li key={playerID} style={{ opacity: isCurrentPlayer ? 1 : 0.5 }}>
            <span
              className='avatar'
              style={{ background: getColor(player.color) }}
            >
              {player.avatar}
            </span>
            <p>
              <em style={{ color: getColor(player.color) }}>
                <span className='icon'>{subject?.icon}</span>
                {subject?.description ?? '--'}
              </em>
              <br />
              {player.name}
            </p>
          </li>
        );
      })}
    </Container>
  );
};
