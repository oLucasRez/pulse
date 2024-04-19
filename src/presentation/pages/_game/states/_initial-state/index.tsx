import { FC, FocusEvent, useRef } from 'react';

import { PlayerModel } from '@domain/models';

import { useGame, usePlayer, useStates, useUser } from '@presentation/hooks';
import { getClasses, getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { useMutatePlayerModal } from '../../hooks';

import { Settings } from '../../components';

export const InitialState: FC = () => {
  const [s, set] = useStates({
    settingsIsOpen: false,
    banningPlayer: false,
    startingGame: false,
  });

  const { me } = useUser();
  const { currentGame, startGame } = useGame();
  const { players, myPlayer, banPlayer } = usePlayer();

  const imHost = me?.uid === currentGame?.uid;

  function handleLinkInputFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.select();
    event.target.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(event.target.value);
  }

  function handleStartButtonClick() {
    set('startingGame')(true);

    startGame().catch(alertError).finally(set('startingGame', false));
  }

  function handleCopyLinkButtonClick() {
    linkInputRef.current?.focus();
  }

  const { openMutatePlayerModal, renderMutatePlayerModal } =
    useMutatePlayerModal();

  function handleEditPlayerButtonClick(player: PlayerModel) {
    openMutatePlayerModal(player);
  }

  function handleBanPlayerButtonClick(playerID: string) {
    set('banningPlayer')(true);

    banPlayer(playerID).catch(alertError).finally(set('banningPlayer', false));
  }

  const linkInputRef = useRef<HTMLInputElement>(null);

  function renderInvite() {
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

  function renderPlayers() {
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
                  <button onClick={() => handleEditPlayerButtonClick(player)}>
                    ✏️
                  </button>
                )}
                {bannable && (
                  <button onClick={() => handleBanPlayerButtonClick(player.id)}>
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

  return (
    <>
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
          {s.startingGame ? <span className='emoji loading'>⏳</span> : 'Start'}
        </button>
      )}

      {renderMutatePlayerModal()}
    </>
  );
};
