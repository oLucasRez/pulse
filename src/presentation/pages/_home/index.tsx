import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';

import { GameModel } from '@domain/models';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { Container } from './styles';

import { githubIcon, googleIcon } from '@presentation/assets';

import { alertError, logError } from '@presentation/utils';

import { useHomeLoaderData } from './loader';

const HomePage: FC = () => {
  const s = useStates({
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchGames: Date.now(),
    fetchingGames: false,
    fetchingCurrentGame: true,
    creatingGame: false,
    deletingGame: null as string | null,
    linking: false,
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

  const linking = (): any => (s.linking = true);
  const linked = (): any => (s.linking = false);

  const me = useHomeLoaderData();

  const { getGames, getCurrentGame, createGame, deleteGame } =
    useGameUsecases();

  useEffect(() => {
    fetchingCurrentGame();

    getCurrentGame
      .execute()
      .then(setCurrentGame)
      .catch(alertError)
      .finally(fetchedCurrentGame);
  }, []);

  useEffect(() => {
    fetchingGames();

    getGames.execute().then(setGames).catch(logError).finally(fetchedGames);
  }, [s.fetchGames]);

  const { navigateToGame, navigateToLogout, reloadWindow } = useNavigate();

  function handleCreateGameButtonClick(): any {
    creatingGame();

    createGame
      .execute({
        title: faker.lorem.sentence({ min: 1, max: 3 }).replace('.', ''),
        config: {
          maxPlayers: 5,
          withLightspot: true,
          dicesMode: 'growing',
        },
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

  const { linkWithProvider } = useAuthUsecases();

  function handleGoogleButtonClick(): any {
    linking();

    linkWithProvider
      .execute('google')
      .then(reloadWindow)
      .catch(alertError)
      .finally(linked);
  }

  function handleGithubButtonClick(): any {
    linking();

    linkWithProvider
      .execute('github')
      .then(reloadWindow)
      .catch(alertError)
      .finally(linked);
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

  const notLinkedWithGoogle = !me.providers.includes('google');
  const notLinkedWithGithub = !me.providers.includes('github');

  return (
    <Container>
      <header>
        {(notLinkedWithGoogle || notLinkedWithGithub) && (
          <div className='providers'>
            Link with
            {notLinkedWithGoogle && (
              <button
                className='linkWithProvider'
                onClick={handleGoogleButtonClick}
                disabled={s.linking}
              >
                <img src={googleIcon} />
              </button>
            )}
            {notLinkedWithGithub && (
              <button
                className='linkWithProvider'
                onClick={handleGithubButtonClick}
                disabled={s.linking}
              >
                <img src={githubIcon} />
              </button>
            )}
          </div>
        )}

        <span className='greetings'>
          👤 Hello
          {me.name ? (
            <>
              , <b>{me?.name}</b>
            </>
          ) : (
            ''
          )}
          !
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
