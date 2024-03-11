import { FC, FocusEvent, ReactNode, useRef } from 'react';

import { PlayerModel } from '@domain/models';

import { GlobalLoading, Navigate } from '@presentation/components';
import {
  useAuthUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { useNavigate, useStates, useWatch } from '@presentation/hooks';
import { getClasses, getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { useMutatePlayerModal } from './hooks';

import { Map, Settings } from './components';

import { Container, Main } from './styles';

const GamePage: FC = () => {
  const [s, set] = useStates({
    watchingCurrentGame: true,
    watchingPlayers: true,
    watchingSubjects: true,
    settingsIsOpen: false,
    banningPlayer: false,
    startingGame: false,
  });

  const { currentGame, watchCurrentGame, startGame } = useGameUsecases();

  const { players, myPlayer, watchPlayers, banPlayer } = usePlayerUsecases();

  const { watchSubjects } = useSubjectUsecases();

  useWatch(() => watchPlayers().finally(set('watchingPlayers', false)));
  useWatch(() => watchCurrentGame().finally(set('watchingCurrentGame', false)));
  useWatch(() => watchSubjects().finally(set('watchingSubjects', false)));

  const { navigateToHome, navigateToLogout } = useNavigate();

  const linkInputRef = useRef<HTMLInputElement>(null);

  const { me } = useAuthUsecases();

  if (!me) return null;

  const imHost = me?.uid === currentGame?.uid;

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
    set('banningPlayer')(true);

    banPlayer(playerID).catch(alertError).finally(set('banningPlayer', false));
  }

  function handleStartButtonClick(): any {
    set('startingGame')(true);

    startGame().catch(alertError).finally(set('startingGame', false));
  }

  function renderInvite(): ReactNode {
    if (!imHost)
      return <p className='invite'>Wait until the host starts the game!</p>;

    const reachedMaxPlayers = currentGame?.config.maxPlayers === players.length;

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
    if (s.watchingPlayers || s.watchingSubjects)
      return (
        <div className='players'>
          <span className='loading'>⏳</span>
        </div>
      );

    return (
      <div className='players'>
        {players.map((player) => {
          const isMyPlayer = player.id === myPlayer?.id;
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
    if (myPlayer?.banned)
      return (
        <Main>
          <span className='icon block'>🚫</span>
          you were banned by the host
          <button onClick={navigateToHome}>Go back</button>
        </Main>
      );

    if (!currentGame) return null;

    if (currentGame.started)
      return (
        <Main>
          <Map />
        </Main>
      );

    return (
      <Main>
        {imHost && s.settingsIsOpen && (
          <Settings onClose={set('settingsIsOpen', false)} />
        )}
        {imHost && !s.settingsIsOpen && (
          <button className='settings' onClick={set('settingsIsOpen', true)}>
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
        {myPlayer?.avatar} Hello
        {me?.name ? (
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

  if (s.watchingCurrentGame) return <GlobalLoading />;

  if (!currentGame) return <Navigate.toHome />;

  return (
    <>
      <Container>
        <header>
          <button onClick={navigateToHome}>🔙</button>

          <h2>
            <b>{currentGame.title}</b>
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

export default GamePage;
