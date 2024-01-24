import { FC, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import { Color } from '@domain/enums';

import { useStates } from '@presentation/hooks';

import { makeFirebaseDatabase, makeFirebaseSocket } from '@main/factories';

import { Container } from './styles';

const db = makeFirebaseDatabase();
const socket = makeFirebaseSocket();

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    players: [] as PlayerModel[],
  });

  useEffect(() => {
    socket.watch<PlayerModel[]>(
      'players',
      (snapshot) => (s.players = snapshot),
    );
  }, []);

  return (
    <Container>
      <button
        onClick={(): void => {
          db.insert<PlayerModel>('players', {
            name: 'Esther',
            color: Color.RED,
          });
        }}
      >
        create one
      </button>

      <ul>
        {s.players.map((player) => (
          <li key={player.id}>
            <div>
              {player.name} ({player.color}){' '}
              <button onClick={(): any => db.delete('players', player.id)}>
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export { App };
