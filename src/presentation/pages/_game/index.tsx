import { faker } from '@faker-js/faker';
import { FC, FocusEvent, ReactNode, useEffect, useMemo, useRef } from 'react';

import { PlayerModel } from '@domain/models';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases, usePlayerUsecases } from '@presentation/contexts';

import { useMyPlayer } from './proxies';

import { getColor } from '@presentation/styles/mixins';

import { alertError, logError } from '@presentation/utils';

import { useGameLoaderData } from './loader';
import { Container, Main } from './styles';

const GamePage: FC = () => {
  const { me, currentGame } = useGameLoaderData();

  const s = useStates({
    players: [] as PlayerModel[],
    watchingPlayers: false,
    deselectingGame: false,
    fetchCurrentGame: Date.now(),
  });

  const fetchCurrentGame = (): any => (s.fetchCurrentGame = Date.now());

  const deselectingGame = (): any => (s.deselectingGame = true);
  const deselectedGame = (): any => (s.deselectingGame = false);

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const { watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    watchPlayers
      .execute((players) => (s.players = players))
      .then(watchedPlayers)
      .catch(logError);
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

  const { changeUser } = useAuthUsecases();

  const { navigateToHome, navigateToLogout } = useNavigate();

  function handleBackButtonClick(): any {
    deselectingGame();

    navigateToHome();

    changeUser
      .execute({ currentGameID: null })
      .then(deselectedGame)
      .then(fetchCurrentGame)
      .catch(alertError);
  }

  const linkInputRef = useRef<HTMLInputElement>(null);

  function handleLinkInputFocus(event: FocusEvent<HTMLInputElement>): any {
    event.target.select();
    event.target.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(event.target.value);
  }

  function handleCopyLinkButtonClick(): any {
    linkInputRef.current?.focus();
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
        {s.players.map((player) => {
          const styledColor = getColor(player.color);

          return (
            <div key={player.id} className='player'>
              <div className='avatar' style={{ background: styledColor }}>
                {avatars[player.id]}
              </div>
              <span
                className={`name${player.id === myPlayer?.id ? ' me' : ''}`}
              >
                {player.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Container>
      <header>
        <button onClick={handleBackButtonClick} disabled={s.deselectingGame}>
          {s.deselectingGame ? <span className='loading'>⏳</span> : '🔙'}
        </button>

        <h2>
          <b>{currentGame.title}</b>
        </h2>

        <span className='greetings'>
          🧔🏻‍♂️ Hello, <b>{me?.name}</b>!
        </span>
        <button onClick={navigateToLogout}>🚪</button>
      </header>

      <Main>
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

        {renderPlayers()}

        <button className='start'>Start</button>
      </Main>
    </Container>
  );
};

export * from './proxies';
export { gameLoader } from './loader';

export default GamePage;
