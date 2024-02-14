import { faker } from '@faker-js/faker';
import { FC, FocusEvent, ReactNode, useEffect, useMemo, useRef } from 'react';

import { PlayerModel } from '@domain/models';

import { useMutatePlayerModal } from './hooks';
import { useNavigate, useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { useMyPlayer } from './proxies';

import { Container, Main } from './styles';
import { getClasses, getColor } from '@presentation/styles/mixins';

import { logError } from '@presentation/utils';

import { useGameLoaderData } from './loader';

const GamePage: FC = () => {
  const { me, currentGame } = useGameLoaderData();

  const s = useStates({
    players: [] as PlayerModel[],
    watchingPlayers: false,
  });

  const imHost = me?.id === currentGame.hostID;

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const { watchPlayers, banPlayer } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    // let unsubscribe: WatchPlayersUsecase.Response;

    watchPlayers
      .execute((players) => (s.players = players))
      // .then((value) => (unsubscribe = value))
      .catch(logError)
      .finally(watchedPlayers);

    // return () => unsubscribe?.();
  }, []);

  const avatars = useMemo(() => {
    const value: Record<string, string> = {};

    s.players.map(
      (player) =>
        (value[player.id] = faker.helpers.arrayElement([
          ...['🧒🏻', '👧🏻', '👦🏻', '🧑🏻', '👩🏻', '👨🏻', '🧑🏻‍🦱', '👩🏻‍🦱', '👨🏻‍🦱'],
          ...['🧑🏻‍🦰', '👩🏻‍🦰', '👨🏻‍🦰', '👱🏻', '👱🏻‍♀️', '👱🏻‍♂️', '🧑🏻‍🦳', '👩🏻‍🦳', '👨🏻‍🦳'],
          ...['🧑🏻‍🦲', '👩🏻‍🦲', '👨🏻‍🦲', '🧔🏻', '🧔🏻‍♀️', '🧔🏻‍♂️', '🧓🏻', '👵🏻', '👴🏻'],
          ...['🧒🏻', '👧🏻', '👦🏻', '🧑🏻', '👩🏻', '👨🏻', '🧑🏻‍🦱', '👩🏻‍🦱', '👨🏻‍🦱'],
          ...['🧑🏻‍🦰', '👩🏻‍🦰', '👨🏻‍🦰', '👱🏻', '👱🏻‍♀️', '👱🏻‍♂️', '🧑🏻‍🦳', '👩🏻‍🦳', '👨🏻‍🦳'],
          ...['🧑🏻‍🦲', '👩🏻‍🦲', '👨🏻‍🦲', '🧔🏻', '🧔🏻‍♀️', '🧔🏻‍♂️', '🧓🏻', '👵🏻', '👴🏻'],
          ...['🧒🏽', '👧🏽', '👦🏽', '🧑🏽', '👩🏽', '👨🏽', '🧑🏽‍🦱', '👩🏽‍🦱', '👨🏽‍🦱'],
          ...['🧑🏽‍🦰', '👩🏽‍🦰', '👨🏽‍🦰', '👱🏽', '👱🏽‍♀️', '👱🏽‍♂️', '🧑🏽‍🦳', '👩🏽‍🦳', '👨🏽‍🦳'],
          ...['🧑🏽‍🦲', '👩🏽‍🦲', '👨🏽‍🦲', '🧔🏽', '🧔🏽‍♀️', '🧔🏽‍♂️', '🧓🏽', '👵🏽', '👴🏽'],
          ...['🧒🏽', '👧🏽', '👦🏽', '🧑🏽', '👩🏽', '👨🏽', '🧑🏽‍🦱', '👩🏽‍🦱', '👨🏽‍🦱'],
          ...['🧑🏽‍🦰', '👩🏽‍🦰', '👨🏽‍🦰', '👱🏽', '👱🏽‍♀️', '👱🏽‍♂️', '🧑🏽‍🦳', '👩🏽‍🦳', '👨🏽‍🦳'],
          ...['🧑🏽‍🦲', '👩🏽‍🦲', '👨🏽‍🦲', '🧔🏽', '🧔🏽‍♀️', '🧔🏽‍♂️', '🧓🏽', '👵🏽', '👴🏽'],
          ...['🧒🏿', '👧🏿', '👦🏿', '🧑🏿', '👩🏿', '👨🏿', '🧑🏿‍🦱', '👩🏿‍🦱', '👨🏿‍🦱'],
          ...['🧑🏿‍🦰', '👩🏿‍🦰', '👨🏿‍🦰', '👱🏿', '👱🏿‍♀️', '👱🏿‍♂️', '🧑🏿‍🦳', '👩🏿‍🦳', '👨🏿‍🦳'],
          ...['🧑🏿‍🦲', '👩🏿‍🦲', '👨🏿‍🦲', '🧔🏿', '🧔🏿‍♀️', '🧔🏿‍♂️', '🧓🏿', '👵🏿', '👴🏿'],
        ])),
    );

    return value;
  }, [s.players]);

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

  function handleEditPlayerButtonClick(player: PlayerModel): void {
    openMutatePlayerModal(player);
  }

  function handleBanPlayerButtonClick(playerID: string): void {
    banPlayer.execute(playerID);
  }

  const notBannedPlayers = s.players.filter((player) => !player.banned);

  function renderInvite(): ReactNode {
    if (!imHost)
      return <p className='invite'>Wait until the host starts the game!</p>;

    const reachedMaxPlayers =
      currentGame.config.maxPlayers === notBannedPlayers.length;

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
                    🚫
                  </button>
                )}
              </div>
              <div className='avatar' style={{ background: styledColor }}>
                {avatars[player.id]}
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

    return (
      <Main>
        {renderInvite()}

        {renderPlayers()}

        {imHost && <button className='start'>Start</button>}
      </Main>
    );
  }

  return (
    <>
      <Container>
        <header>
          <button onClick={navigateToHome}>🔙</button>

          <h2>
            <b>{currentGame.title}</b>
          </h2>

          {me ? (
            <span className='greetings'>
              🧔🏻‍♂️ Hello, <b>{me.name}</b>!
            </span>
          ) : (
            <span className='greetings'>
              <button>Login</button>
            </span>
          )}
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
