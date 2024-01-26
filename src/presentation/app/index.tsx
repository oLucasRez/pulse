import { faker } from '@faker-js/faker';
import { FC, useEffect } from 'react';

import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { uuid } from '@presentation/utils';

import { makeFirebaseSocket } from '@main/factories';

import { Container } from './styles';

const socket = makeFirebaseSocket();

const playersTable = 'players';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    players: [] as PlayerModel[],
  });

  const { createPlayer, deletePlayer } = usePlayerUsecases();

  useEffect(() => {
    socket.watch<PlayerModel[]>(
      playersTable,
      (snapshot) => (s.players = snapshot),
    );
  }, []);

  return (
    <Container>
      <button
        onClick={(): void => {
          createPlayer.execute({
            name: faker.person.firstName(),
            color: faker.helpers.enumValue(Color),
            diceID: uuid(),
            gameID: uuid(),
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
              <button onClick={(): any => deletePlayer.execute(player.id)}>
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
