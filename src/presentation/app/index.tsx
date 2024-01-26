import { faker } from '@faker-js/faker';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { ChangePlayerUsecase } from '@domain/usecases';

import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { uuid } from '@presentation/utils';

import { Container } from './styles';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    players: [] as PlayerModel[],
    editing: null as string | null,
  });

  const { getPlayers, createPlayer, changePlayer, deletePlayer } =
    usePlayerUsecases();

  useEffect(() => {
    getPlayers
      .execute()
      .then((players) => (s.players = players))
      .catch(() => {});
  }, []);

  const { register, handleSubmit } = useForm<ChangePlayerUsecase.Payload>({
    mode: 'onChange',
  });

  function onSubmit(data: ChangePlayerUsecase.Payload): void {
    if (!s.editing) return;

    changePlayer.execute(s.editing, data);

    s.editing = null;
  }

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
        {s.players.map((player) => {
          const editing = s.editing === player.id;

          let handleLeftButtonClick = (): any => (s.editing = player.id);
          if (editing) handleLeftButtonClick = handleSubmit(onSubmit);

          let handleRightButtonClick = (): any =>
            deletePlayer.execute(player.id);
          if (editing) handleRightButtonClick = (): any => (s.editing = null);

          return (
            <li key={player.id}>
              <input
                {...(editing ? register('name', { required: true }) : {})}
                defaultValue={player.name}
                disabled={!editing}
              />{' '}
              ({player.color}){' '}
              <button onClick={handleLeftButtonClick}>
                {editing ? <>✔️</> : <>✏️</>}
              </button>
              <button onClick={handleRightButtonClick}>
                {editing ? <>✖️</> : <>🗑️</>}
              </button>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export { App };
