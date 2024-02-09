import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { GameModel, UserModel } from '@domain/models';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { alertError, logError } from '@presentation/utils';

import { Container } from './styles';

export const Component: FC = () => {
  const s = useStates({
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchGames: Date.now(),
    fetchCurrentGame: Date.now(),
    fetchingGames: false,
    fetchingCurrentGame: false,
    creatingGame: false,
    selectingGame: null as string | null,
    deletingGame: null as string | null,
  });

  const setGames = (games: GameModel[]): any => (s.games = games);
  const setCurrentGame = (game: GameModel | null): any =>
    (s.currentGame = game);

  const fetchGames = (): any => (s.fetchGames = Date.now());
  const fetchCurrentGame = (): any => (s.fetchCurrentGame = Date.now());

  const fetchingGames = (): any => (s.fetchingGames = true);
  const fetchedGames = (): any => (s.fetchingGames = false);

  const fetchingCurrentGame = (): any => (s.fetchingCurrentGame = true);
  const fetchedCurrentGame = (): any => (s.fetchingCurrentGame = false);

  const creatingGame = (): any => (s.creatingGame = true);
  const createdGame = (): any => (s.creatingGame = false);

  const selectingGame = (game: GameModel | null): any =>
    (s.selectingGame = game && game.id);
  const selectedGame = (): any => (s.selectingGame = null);

  const deletingGame = (game: GameModel): any => (s.deletingGame = game.id);
  const deletedGame = (): any => (s.deletingGame = null);

  const me: UserModel = useLoaderData() as any;

  const { changeUser } = useAuthUsecases();
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

  const navigate = useNavigate();

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

  function handleSelectGameButtonClick(game: GameModel): any {
    selectingGame(game);

    changeUser
      .execute({ currentGameID: game.id })
      .then(selectedGame)
      .then(fetchCurrentGame)
      .then(() => navigate(`/game/${game.id}`))
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
          const selectingGame = s.selectingGame === game.id;
          const deletingGame = s.deletingGame === game.id;

          return (
            <li key={game.id}>
              <p>• {game.title}</p>

              <button
                className='select'
                onClick={(): any => handleSelectGameButtonClick(game)}
                disabled={selectingGame}
              >
                {selectingGame ? (
                  <span className='emoji loading'>⏳</span>
                ) : (
                  <span className='emoji'>👁️</span>
                )}
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
        <button
          onClick={(): any => {
            localStorage.removeItem('session');
            navigate('/login');
          }}
        >
          🚪
        </button>
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

Component.displayName = 'HomePage';
