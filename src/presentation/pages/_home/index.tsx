import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';

import { GameModel } from '@domain/models';

import { useNavigate, useStates } from '@presentation/hooks';

import { useGameUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { alertError, logError } from '@presentation/utils';

import { useHomeLoaderData } from './loader';
import { Container } from './styles';

const HomePage: FC = () => {
  const s = useStates({
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchGames: Date.now(),
    fetchCurrentGame: Date.now(),
    fetchingGames: false,
    fetchingCurrentGame: false,
    creatingGame: false,
    deletingGame: null as string | null,
  });

  const setGames = (games: GameModel[]): any => (s.games = games);
  const setCurrentGame = (game: GameModel | null): any =>
    (s.currentGame = game);

  const fetchGames = (): any => (s.fetchGames = Date.now());

  const fetchingGames = (): any => (s.fetchingGames = true);
  const fetchedGames = (): any => (s.fetchingGames = false);

  const fetchingCurrentGame = (): any => (s.fetchingCurrentGame = true);
  const fetchedCurrentGame = (): any => (s.fetchingCurrentGame = false);

  const creatingGame = (): any => (s.creatingGame = true);
  const createdGame = (): any => (s.creatingGame = false);

  const deletingGame = (game: GameModel): any => (s.deletingGame = game.id);
  const deletedGame = (): any => (s.deletingGame = null);

  const me = useHomeLoaderData();

  const { getGames, getCurrentGame, createGame, deleteGame } =
    useGameUsecases();

  useEffect(() => {
    fetchingCurrentGame();

    getCurrentGame
      .execute()
      .then(setCurrentGame)
      .then(fetchedCurrentGame)
      .catch(alertError);
  }, [s.fetchCurrentGame]);

  useEffect(() => {
    fetchingGames();

    getGames.execute().then(setGames).then(fetchedGames).catch(logError);
  }, [s.fetchGames]);

  const { navigateToGame, navigateToLogout } = useNavigate();

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
        + New Game
        {s.creatingGame && (
          <>
            {' '}
            <span className='emoji loading'>⏳</span>
          </>
        )}
      </button>
    );
  }

  function renderGamesList(): ReactNode {
    if (s.fetchingGames && !s.games.length)
      return (
        <ul className='games'>
          <span className='emoji loading'>⏳</span>
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
        {s.games.map((game) => {
          const deletingGame = s.deletingGame === game.id;

          return (
            <li key={game.id}>
              <p>• {game.title}</p>

              <button
                className='select'
                onClick={(): any => navigateToGame(game.id)}
              >
                <span className='emoji'>👁️</span>
              </button>

              <button className='edit' disabled>
                <span className='emoji'>✏️</span>
              </button>

              <button
                className='delete'
                disabled={deletingGame}
                onClick={(): any => handleDeleteGameButtonClick(game)}
              >
                {deletingGame ? (
                  <span className='emoji loading'>⏳</span>
                ) : (
                  <span className='emoji'>🗑️</span>
                )}
              </button>
            </li>
          );
        })}

        <li>{renderCreateGameButton()}</li>
      </ul>
    );
  }

  if (s.fetchingCurrentGame) return <GlobalLoading />;

  return (
    <Container>
      <header>
        <span className='greetings'>
          🧔🏻‍♂️ Hello, <b>{me?.name}</b>!
        </span>
        <button onClick={navigateToLogout}>🚪</button>
      </header>

      <aside>
        <h3>
          <span className='emoji'>🎮</span> My Games
        </h3>

        {renderGamesList()}
      </aside>

      <main />
    </Container>
  );
};

export { homeLoader } from './loader';

export default HomePage;
