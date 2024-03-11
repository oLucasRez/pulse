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
  const { round } = useRoundUsecases();

  return (
    <Container id='players-list'>
      {players.map((player) => {
        const isCurrentPlayer = round?.currentPlayerID === player.id;

        const subject = subjects.find((value) => value.authorID === player.id);

        return (
          <li key={player.id} style={{ opacity: isCurrentPlayer ? 1 : 0.5 }}>
            <span
              className='avatar'
              style={{ background: getColor(player.color) }}
            >
              {player.avatar}
            </span>
            <p>
              <em>
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
