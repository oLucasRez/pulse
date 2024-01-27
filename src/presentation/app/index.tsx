import { faker } from '@faker-js/faker';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { DomainError, NotFoundError } from '@domain/errors';

import { ChangePlayerUsecase } from '@domain/usecases';

import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { getColor } from '@presentation/styles/mixins';

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

  const { watchPlayers, createPlayer, changePlayer, deletePlayer } =
    usePlayerUsecases();

  useEffect(() => {
    const unsubscribe = watchPlayers.execute(
      (players) => (s.players = players),
    );

    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ChangePlayerUsecase.Payload>({
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
          createPlayer
            .execute({
              name: faker.person.firstName(),
              color: faker.helpers.enumValue(Color),
              diceID: uuid(),
              gameID: uuid(),
            })
            .catch(
              (e: DomainError) =>
                e instanceof NotFoundError && alert(e.message),
            );
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
              <span style={{ background: getColor(player.color) }}>
                ({player.color})
              </span>
              <button
                disabled={editing && !isDirty}
                onClick={handleLeftButtonClick}
              >
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
