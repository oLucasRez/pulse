import { faker } from '@faker-js/faker';
import { FC } from 'react';

import { GameModel } from '@domain/models';

import { githubIcon, googleIcon } from '@presentation/assets';
import { useGame, useNavigate, useStates, useUser } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { Container } from './styles';

const HomePage: FC = () => {
  const [s, set] = useStates({
    creatingGame: false,
    deletingGame: null as string | null,
    linking: false,
    returnToGameBannerIsClosed: false,
  });

  const { games, fetchingGames, currentGame, createGame, deleteGame } =
    useGame();

  const { me, setCurrentGame, linkWithProvider } = useUser();

  const { navigateToGame, navigateToLogout, reloadWindow } = useNavigate();

  function handleCreateGameButtonClick() {
    s.creatingGame = true;

    createGame({
      title: faker.lorem.sentence({ min: 1, max: 3 }).replace('.', ''),
      config: {
        maxPlayers: 5,
        withLightSpot: true,
        dicesMode: 'growing',
      },
    })
      .then(set('creatingGame', false))
      .catch(alertError);
  }

  function handleDeleteGameButtonClick(game: GameModel) {
    s.deletingGame = game.id;

    deleteGame(game.id).catch(alertError).finally(set('deletingGame', null));

    if (currentGame?.id === game.id) s.returnToGameBannerIsClosed = false;
  }

  function handleGoogleButtonClick() {
    s.linking = true;

    linkWithProvider('google')
      .then(reloadWindow)
      .catch(alertError)
      .finally(set('linking', false));
  }

  function handleGithubButtonClick() {
    s.linking = true;

    linkWithProvider('github')
      .then(reloadWindow)
      .catch(alertError)
      .finally(set('linking', false));
  }

  function renderCreateGameButton() {
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

  function renderGamesList() {
    if (fetchingGames && !games.length)
      return (
        <ul className='games'>
          <span className='emoji loading'>⏳</span>
        </ul>
      );

    if (!games.length)
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
        {games.map((game) => {
          const deletingGame = s.deletingGame === game.id;
          const notMine = game.uid !== me?.uid;

          return (
            <li key={game.id}>
              <p>• {game.title}</p>

              <button
                className='select'
                onClick={() => navigateToGame(game.id)}
              >
                <span className='emoji'>👁️</span>
              </button>

              <button className='edit' disabled>
                <span className='emoji'>✏️</span>
              </button>

              <button
                className='delete'
                disabled={deletingGame || notMine}
                onClick={() => handleDeleteGameButtonClick(game)}
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

  const notLinkedWithGoogle = !me?.providers.includes('google');
  const notLinkedWithGithub = !me?.providers.includes('github');

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
          {me?.name ? (
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

      {currentGame && !s.returnToGameBannerIsClosed && (
        <span id='return-to-game'>
          Return to the game {currentGame.title}
          <button onClick={() => navigateToGame(currentGame.id)}>Return</button>
          <button
            onClick={() => {
              setCurrentGame(null);
              s.returnToGameBannerIsClosed = true;
            }}
          >
            x
          </button>
        </span>
      )}
    </Container>
  );
};

export default HomePage;
