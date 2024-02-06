import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect } from 'react';

import { GameModel, UserModel } from '@domain/models';

import { DomainError } from '@domain/errors';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

import { GameScreen } from './components';

import { Container } from './styles';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  const s = useStates({
    me: null as UserModel | null,
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchGames: Date.now(),
    fetchCurrentGame: Date.now(),
    fetchingGames: false,
    fetchingCurrentGame: false,
    creatingGame: false,
    selectingGame: null as string | null,
    deselectingGame: false,
    deletingGame: null as string | null,
  });

  const setMe = (me: UserModel | null): any => (s.me = me);
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

  const deselectingGame = (): any => (s.deselectingGame = true);
  const deselectedGame = (): any => (s.deselectingGame = false);

  const deletingGame = (game: GameModel): any => (s.deletingGame = game.id);
  const deletedGame = (): any => (s.deletingGame = null);

  const { getMe, changeUser } = useAuthUsecases();
  const { getGames, getCurrentGame, createGame, deleteGame } =
    useGameUsecases();

  const logError = (e: DomainError): any => console.error(e.message);
  const alertError = (e: DomainError): any => alert(e.message);

  useEffect(() => {
    getMe.execute().then(setMe).catch(logError);
  }, []);

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

  function handleBackButtonClick(): any {
    deselectingGame();

    changeUser
      .execute({ currentGameID: null })
      .then(deselectedGame)
      .then(fetchCurrentGame)
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

  function renderSidebar(): ReactNode {
    if (s.currentGame) return;

    return (
      <aside>
        <h3>
          <span className='emoji'>🎮</span> My Games
        </h3>

        {renderGamesList()}
      </aside>
    );
  }

  if (s.fetchingCurrentGame)
    return (
      <Container className='globalLoading'>
        <span className='emoji loading'>⏳</span>
      </Container>
    );

  return (
    <Container>
      <header>
        {s.currentGame && (
          <button onClick={handleBackButtonClick} disabled={s.deselectingGame}>
            {s.deselectingGame ? <span className='loading'>⏳</span> : '🔙'}
          </button>
        )}

        {s.currentGame && (
          <h2>
            <b>{s.currentGame.title}</b>
          </h2>
        )}

        <span className='greetings'>
          🧔🏻‍♂️ Hello, <b>{s.me?.name}</b>!
        </span>
      </header>

      {renderSidebar()}

      <main>{s.currentGame && <GameScreen game={s.currentGame} />}</main>
    </Container>
  );
};

export { App };
