import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';

import { GameModel } from '@domain/models';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

import { Container } from './styles';

import { githubIcon, googleIcon } from '@presentation/assets';

import { alertError, logError } from '@presentation/utils';

import { useHomeLoaderData } from './loader';

const HomePage: FC = () => {
  const [s, set] = useStates({
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchGames: Date.now(),
    fetchingGames: false,
    creatingGame: false,
    deletingGame: null as string | null,
    linking: false,
  });

  const fetchGames = set('fetchGames', Date.now());

  const me = useHomeLoaderData();

  const { getGames, createGame, deleteGame } = useGameUsecases();

  useEffect(() => {
    set('fetchingGames')(true);

    getGames
      .execute()
      .then(set('games'))
      .catch(logError)
      .finally(set('fetchingGames', false));
  }, [s.fetchGames]);

  const { navigateToGame, navigateToLogout, reloadWindow } = useNavigate();

  function handleCreateGameButtonClick(): any {
    set('creatingGame')(true);

    createGame
      .execute({
        title: faker.lorem.sentence({ min: 1, max: 3 }).replace('.', ''),
        config: {
          maxPlayers: 5,
          withLightspot: true,
          dicesMode: 'growing',
        },
      })
      .then(set('creatingGame', false))
      .then(fetchGames)
      .catch(alertError);
  }

  function handleDeleteGameButtonClick(game: GameModel): any {
    set('deletingGame')(game.id);

    deleteGame
      .execute(game.id)
      .then(set('deletingGame', null))
      .then(fetchGames)
      .catch(alertError);
  }

  const { linkWithProvider } = useAuthUsecases();

  function handleGoogleButtonClick(): any {
    set('linking')(true);

    linkWithProvider
      .execute('google')
      .then(reloadWindow)
      .catch(alertError)
      .finally(set('linking', false));
  }

  function handleGithubButtonClick(): any {
    set('linking')(true);

    linkWithProvider
      .execute('github')
      .then(reloadWindow)
      .catch(alertError)
      .finally(set('linking', false));
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
