import { faker } from '@faker-js/faker';
import { FC, useEffect } from 'react';

import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { useStates } from '@presentation/hooks';

import { usePlayersContext } from '@presentation/contexts';

import { uuid } from '@presentation/utils';

import { makeFirebaseDatabase, makeFirebaseSocket } from '@main/factories';

import { Container } from './styles';

const db = makeFirebaseDatabase();
const socket = makeFirebaseSocket();

const playersTable = 'players';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    players: [] as PlayerModel[],
  });

  const { create } = usePlayersContext();

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
          create.execute({
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
              <button onClick={(): any => db.delete(playersTable, player.id)}>
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
