import { faker } from '@faker-js/faker';
import { FC, ReactNode, useEffect, useMemo } from 'react';

import { PlayerModel, UserModel } from '@domain/models';

import { DomainError } from '@domain/errors';

import { GameScreenProps } from './types';

import { useStates } from '@presentation/hooks';

import {
  useAuthUsecases,
  useCreatePlayerModal,
  usePlayerUsecases,
} from '@presentation/contexts';

import { getColor } from '@presentation/styles/mixins';

import { Container } from './styles';

export const GameScreen: FC<GameScreenProps> = () => {
  const s = useStates({
    me: null as UserModel | null,
    players: [] as PlayerModel[],
    watchingPlayers: false,
  });

  const watchingPlayers = (): any => (s.watchingPlayers = true);
  const watchedPlayers = (): any => (s.watchingPlayers = false);

  const { openCreatePlayerModal } = useCreatePlayerModal();

  const logError = (e: DomainError): any => console.error(e.message);

  const { watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    watchingPlayers();

    watchPlayers
      .execute((players) => (s.players = players))
      .then(watchedPlayers)
      .catch(logError);
  }, []);

  const { getMe } = useAuthUsecases();
  useEffect(() => {
    getMe
      .execute()
      .then((me) => (s.me = me))
      .catch(logError);
  }, []);

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

  const myPlayer = s.players.find((player) => player.userID === s.me?.id);

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
