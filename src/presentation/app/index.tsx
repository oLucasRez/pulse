import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';

import { GameModel, UserModel } from '@domain/models';

import { DomainError } from '@domain/errors';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

import { Container } from './styles';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    user: null as UserModel | null,
    games: [] as GameModel[],
    fetchGames: Date.now(),
    fetchingGames: false,
    creatingGame: false,
    deletingGame: null as string | null,
  });

  const setUser = (user: UserModel | null): any => (s.user = user);
  const setGames = (games: GameModel[]): any => (s.games = games);

  const fetchGames = (): any => (s.fetchGames = Date.now());

  const fetchingGames = (): any => (s.fetchingGames = true);
  const fetchedGames = (): any => (s.fetchingGames = false);

  const creatingGame = (): any => (s.creatingGame = true);
  const createdGame = (): any => (s.creatingGame = false);

  const deletingGame = (game: GameModel): any => (s.deletingGame = game.id);
  const deletedGame = (): any => (s.deletingGame = null);

  const { getCurrentUser } = useAuthUsecases();
  const { getGames, createGame, deleteGame } = useGameUsecases();

  const logError = (e: DomainError): any => console.error(e.message);
  const alertError = (e: DomainError): any => alert(e.message);

  useEffect(() => {
    getCurrentUser.execute().then(setUser).catch(logError);
  }, []);

  useEffect(() => {
    fetchingGames();

    getGames.execute().then(setGames).then(fetchedGames).catch(logError);
  }, [s.fetchGames]);

  function handleCreateGameButtonClick(): any {
    creatingGame();

    createGame
      .execute({
        title: faker.lorem.sentence({ min: 1, max: 3 }).replace('.', ''),
      })
      .then(createdGame)
      .then(fetchGames)
      .catch(alertError);
  }

  function handleDeleteGameButtonClick(game: GameModel): any {
    deletingGame(game);

    deleteGame
      .execute(game.id)
      .then(deletedGame)
      .then(fetchGames)
      .catch(alertError);
  }

  function renderCreateGameButton(): ReactNode {
    return (
      <button
        className='create'
        onClick={handleCreateGameButtonClick}
        disabled={s.creatingGame}
      >
        + New Game{s.creatingGame && <span className='emoji'> ⏳</span>}
      </button>
    );
  }

  function renderGamesList(): ReactNode {
    if (s.fetchingGames && !s.games.length)
      return (
        <ul className='games'>
          <span className='emoji'>⏳</span>
        </ul>
      );

    if (!s.games.length)
      return (
        <ul className='games'>
          <li>
            <p className='empty'>
              You don&apos;t
              <br />
              have games yet :(
            </p>
          </li>

          <li>{renderCreateGameButton()}</li>
        </ul>
      );

    return (
      <ul className='games'>
        {s.games.map((game) => (
          <li key={game.id}>
            <p>• {game.title}</p>

            <button className='edit' disabled>
              <span className='emoji'>✏️</span>
            </button>
            <button
              className='delete'
              disabled={s.deletingGame === game.id}
              onClick={(): any => handleDeleteGameButtonClick(game)}
            >
              {s.deletingGame === game.id ? (
                <span className='emoji'>⏳</span>
              ) : (
                <span className='emoji'>🗑️</span>
              )}
            </button>
          </li>
        ))}

        <li>{renderCreateGameButton()}</li>
      </ul>
    );
  }

  return (
    <Container>
      <header>
        Hello, <b>{s.user?.name}</b>!
      </header>

      <aside>
        <h3>
          <span className='emoji'>🎮</span> My Games
        </h3>

        {renderGamesList()}
      </aside>
    </Container>
  );
};

export { App };
