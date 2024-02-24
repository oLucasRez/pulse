import { FC, FocusEvent, ReactNode, useEffect, useRef } from 'react';

import { GameModel, PlayerModel } from '@domain/models';

import { WatchPlayersUsecase } from '@domain/usecases';

import { useMutatePlayerModal } from './hooks';
import { useNavigate, useStates } from '@presentation/hooks';

import { useGameUsecases, usePlayerUsecases } from '@presentation/contexts';

import { Map, Settings } from './components';

import { useMe, useMyPlayer } from './proxies';

import { Container, Main } from './styles';
import { getClasses, getColor } from '@presentation/styles/mixins';

import { alertError, logError } from '@presentation/utils';

import { useGameLoaderData } from './loader';

const GamePage: FC = () => {
  const me = useMe();

  const s = useStates({
    currentGame: useGameLoaderData(),
    players: [] as PlayerModel[],
    watchingPlayers: false,
    settingsIsOpen: false,
    banningPlayer: false,
    startingGame: false,
  });

  const setCurrentGame = (currentGame: GameModel): any =>
    (s.currentGame = currentGame);

  const imHost = me.uid === s.currentGame.host.uid;

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const openSettings = (): any => (s.settingsIsOpen = true);
  const closeSettings = (): any => (s.settingsIsOpen = false);

  const banningPlayer = (): any => (s.banningPlayer = true);
  const bannedPlayer = (): any => (s.banningPlayer = false);

  const startingGame = (): any => (s.startingGame = true);
  const startedGame = (): any => (s.startingGame = false);

  const { startGame, getCurrentGame } = useGameUsecases();

  function fetchCurrentGame(): any {
    getCurrentGame
      .execute()
      .then((currentGame) => {
        if (currentGame) setCurrentGame(currentGame);
      })
      .catch(logError);
  }

  const { watchPlayers, banPlayer } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    let unsubscribe: WatchPlayersUsecase.Response;

    watchPlayers
      .execute((players) => (s.players = players))
      .then((value) => (unsubscribe = value))
      .catch(logError)
      .finally(watchedPlayers);

    return () => unsubscribe?.();
  }, []);

  const myPlayer = useMyPlayer();

  const { navigateToHome, navigateToLogout } = useNavigate();

  const linkInputRef = useRef<HTMLInputElement>(null);

  function handleLinkInputFocus(event: FocusEvent<HTMLInputElement>): any {
    event.target.select();
    event.target.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(event.target.value);
  }

  function handleCopyLinkButtonClick(): any {
    linkInputRef.current?.focus();
  }

  const { openMutatePlayerModal, renderMutatePlayerModal } =
    useMutatePlayerModal();

  function handleEditPlayerButtonClick(player: PlayerModel): any {
    openMutatePlayerModal(player);
  }

  function handleBanPlayerButtonClick(playerID: string): any {
    banningPlayer();

    banPlayer.execute(playerID).catch(alertError).finally(bannedPlayer);
  }

  function handleStartButtonClick(): any {
    startingGame();

    startGame
      .execute()
      .then(fetchCurrentGame)
      .catch(alertError)
      .finally(startedGame);
  }

  const notBannedPlayers = s.players.filter((player) => !player.banned);

  function renderInvite(): ReactNode {
    if (!imHost)
      return <p className='invite'>Wait until the host starts the game!</p>;

    const reachedMaxPlayers =
      s.currentGame.config.maxPlayers === notBannedPlayers.length;

    if (reachedMaxPlayers) return;

    return (
      <>
        <p className='invite'>Invite your friends to join the game!</p>

        <div className='link'>
          <input
            ref={linkInputRef}
            value={location.href}
            autoFocus
            onFocus={handleLinkInputFocus}
            readOnly
          />
          <button onClick={handleCopyLinkButtonClick}>📑</button>
        </div>
      </>
    );
  }

  function renderPlayers(): ReactNode {
    if (s.watchingPlayers)
      return (
        <div className='players'>
          <span className='loading'>⏳</span>
        </div>
      );

    return (
      <div className='players'>
        {notBannedPlayers.map((player) => {
          const isMyPlayer = player.id === myPlayer.id;
          const bannable = imHost && !isMyPlayer;
          const editable = isMyPlayer;
          const styledColor = getColor(player.color);

          return (
            <div key={player.id} className='player'>
              <div className='actions'>
                {editable && (
                  <button
                    onClick={(): any => handleEditPlayerButtonClick(player)}
                  >
                    ✏️
                  </button>
                )}
                {bannable && (
                  <button
                    onClick={(): any => handleBanPlayerButtonClick(player.id)}
                  >
                    {s.banningPlayer ? (
                      <span className='emoji loading'>⏳</span>
                    ) : (
                      '🚫'
                    )}
                  </button>
                )}
              </div>
              <div className='avatar' style={{ background: styledColor }}>
                {player.avatar}
              </div>
              <span className={getClasses({ name: true, me: isMyPlayer })}>
                {player.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  function renderMain(): ReactNode {
    if (myPlayer.banned)
      return (
        <Main>
          <span className='icon block'>🚫</span>
          you were banned by the host
          <button onClick={navigateToHome}>Go back</button>
        </Main>
      );

    if (s.currentGame.started)
      return (
        <Main>
          <Map />
        </Main>
      );

    return (
      <Main>
        {imHost && s.settingsIsOpen && <Settings onClose={closeSettings} />}
        {imHost && !s.settingsIsOpen && (
          <button className='settings' onClick={openSettings}>
            <span className='emoji'>⚙️</span>
          </button>
        )}

        {renderInvite()}

        {renderPlayers()}

        {imHost && (
          <button
            className='start'
            disabled={s.startingGame}
            onClick={handleStartButtonClick}
          >
            {s.startingGame ? (
              <span className='emoji loading'>⏳</span>
            ) : (
              'Start'
            )}
          </button>
        )}
      </Main>
    );
  }

  function renderMyHeader(): ReactNode {
    return (
      <span className='greetings'>
        {myPlayer.avatar} Hello
        {me.name ? (
          <>
            , <b>{me.name}</b>
          </>
        ) : (
          ''
        )}
        !
      </span>
    );
  }

  return (
    <>
      <Container>
        <header>
          <button onClick={navigateToHome}>🔙</button>

          <h2>
            <b>{s.currentGame.title}</b>
          </h2>

          {renderMyHeader()}
          <button onClick={navigateToLogout}>🚪</button>
        </header>

        {renderMain()}
      </Container>

      {renderMutatePlayerModal()}
    </>
  );
};

export * from './proxies';
export { gameLoader } from './loader';

export default GamePage;
