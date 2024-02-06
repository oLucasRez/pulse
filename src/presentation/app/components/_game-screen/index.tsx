import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect, useMemo } from 'react';

import { PlayerModel } from '@domain/models';

import { GameScreenProps } from './types';

import { useStates } from '@presentation/hooks';

import {
  useCreatePlayerModal,
  usePlayerUsecases,
  useSession,
} from '@presentation/contexts';

import { getColor } from '@presentation/styles/mixins';

import { logError } from '@presentation/utils';

import { Container } from './styles';

export const GameScreen: FC<GameScreenProps> = () => {
  const s = useStates({
    players: [] as PlayerModel[],
    watchingPlayers: false,
  });

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const { openCreatePlayerModal } = useCreatePlayerModal();

  const { watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    watchPlayers
      .execute((players) => (s.players = players))
      .then(watchedPlayers)
      .catch(logError);
  }, []);

  const { me } = useSession();

  const avatars = useMemo(() => {
    const value: Record<string, string> = {};

    s.players.map(
      (player) =>
        (value[player.id] = faker.helpers.arrayElement([
          '🧒🏻',
          '👧🏻',
          '👦🏻',
          '🧑🏻',
          '👩🏻',
          '👨🏻',
          '🧑🏻‍🦱',
          '👩🏻‍🦱',
          '👨🏻‍🦱',
          '🧑🏻‍🦰',
          '👩🏻‍🦰',
          '👨🏻‍🦰',
          '👱🏻',
          '👱🏻‍♀️',
          '👱🏻‍♂️',
          '🧑🏻‍🦳',
          '👩🏻‍🦳',
          '👨🏻‍🦳',
          '🧑🏻‍🦲',
          '👩🏻‍🦲',
          '👨🏻‍🦲',
          '🧔🏻',
          '🧔🏻‍♀️',
          '🧔🏻‍♂️',
          '🧓🏻',
          '👵🏻',
          '👴🏻',
          '🧒🏻',
          '👧🏻',
          '👦🏻',
          '🧑🏻',
          '👩🏻',
          '👨🏻',
          '🧑🏻‍🦱',
          '👩🏻‍🦱',
          '👨🏻‍🦱',
          '🧑🏻‍🦰',
          '👩🏻‍🦰',
          '👨🏻‍🦰',
          '👱🏻',
          '👱🏻‍♀️',
          '👱🏻‍♂️',
          '🧑🏻‍🦳',
          '👩🏻‍🦳',
          '👨🏻‍🦳',
          '🧑🏻‍🦲',
          '👩🏻‍🦲',
          '👨🏻‍🦲',
          '🧔🏻',
          '🧔🏻‍♀️',
          '🧔🏻‍♂️',
          '🧓🏻',
          '👵🏻',
          '👴🏻',
          '🧒🏽',
          '👧🏽',
          '👦🏽',
          '🧑🏽',
          '👩🏽',
          '👨🏽',
          '🧑🏽‍🦱',
          '👩🏽‍🦱',
          '👨🏽‍🦱',
          '🧑🏽‍🦰',
          '👩🏽‍🦰',
          '👨🏽‍🦰',
          '👱🏽',
          '👱🏽‍♀️',
          '👱🏽‍♂️',
          '🧑🏽‍🦳',
          '👩🏽‍🦳',
          '👨🏽‍🦳',
          '🧑🏽‍🦲',
          '👩🏽‍🦲',
          '👨🏽‍🦲',
          '🧔🏽',
          '🧔🏽‍♀️',
          '🧔🏽‍♂️',
          '🧓🏽',
          '👵🏽',
          '👴🏽',
          '🧒🏽',
          '👧🏽',
          '👦🏽',
          '🧑🏽',
          '👩🏽',
          '👨🏽',
          '🧑🏽‍🦱',
          '👩🏽‍🦱',
          '👨🏽‍🦱',
          '🧑🏽‍🦰',
          '👩🏽‍🦰',
          '👨🏽‍🦰',
          '👱🏽',
          '👱🏽‍♀️',
          '👱🏽‍♂️',
          '🧑🏽‍🦳',
          '👩🏽‍🦳',
          '👨🏽‍🦳',
          '🧑🏽‍🦲',
          '👩🏽‍🦲',
          '👨🏽‍🦲',
          '🧔🏽',
          '🧔🏽‍♀️',
          '🧔🏽‍♂️',
          '🧓🏽',
          '👵🏽',
          '👴🏽',
          '🧒🏿',
          '👧🏿',
          '👦🏿',
          '🧑🏿',
          '👩🏿',
          '👨🏿',
          '🧑🏿‍🦱',
          '👩🏿‍🦱',
          '👨🏿‍🦱',
          '🧑🏿‍🦰',
          '👩🏿‍🦰',
          '👨🏿‍🦰',
          '👱🏿',
          '👱🏿‍♀️',
          '👱🏿‍♂️',
          '🧑🏿‍🦳',
          '👩🏿‍🦳',
          '👨🏿‍🦳',
          '🧑🏿‍🦲',
          '👩🏿‍🦲',
          '👨🏿‍🦲',
          '🧔🏿',
          '🧔🏿‍♀️',
          '🧔🏿‍♂️',
          '🧓🏿',
          '👵🏿',
          '👴🏿',
        ])),
    );

    return value;
  }, [s.players]);

  const myPlayer = s.players.find((player) => player.userID === me?.id);

  function renderPlayers(): ReactNode {
    if (s.watchingPlayers)
      return (
        <div className='players'>
          <span className='loading'>⏳</span>
        </div>
      );

    return (
      <>
        {!myPlayer && <button onClick={openCreatePlayerModal}>Entrar</button>}

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
      </>
    );
  }

  return (
    <Container>
      <p className='invite'>Invite your friends to join the game!</p>

      {renderPlayers()}

      <button className='start'>Start</button>
    </Container>
  );
};
