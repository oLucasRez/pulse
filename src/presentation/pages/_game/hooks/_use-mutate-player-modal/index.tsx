import { MouseEvent, ReactNode, useCallback, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import { WatchPlayersUsecase } from '@domain/usecases';

import {
  MutatePlayerModalHookProps,
  MutatePlayerModalHookReturn,
} from './types';

import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { Container } from './styles';
import { darken, getColor } from '@presentation/styles/mixins';

import { getAvailableColors } from '@domain/utils';
import { alertError, logError } from '@presentation/utils';

import { useMe } from '../..';

const avatars = [
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
];

export function useMutatePlayerModal(
  props: MutatePlayerModalHookProps = {},
): MutatePlayerModalHookReturn {
  const { unclosable, open = false, player, onSuccess } = props;

  const me = useMe();

  const s = useStates({
    open,
    player,
    players: [] as PlayerModel[],
    name: (player?.name || me.name) as string | undefined,
    color: player?.color,
    avatarIndex: player
      ? avatars.findIndex((avatar) => avatar === player.avatar)
      : 0,
    mutatingPlayer: false,
  });
  const nextAvatar = (): any =>
    (s.avatarIndex = (s.avatarIndex + 1) % avatars.length);
  const prevAvatar = (): any =>
    (s.avatarIndex =
      s.avatarIndex - 1 < 0 ? avatars.length - 1 : s.avatarIndex - 1);

  const mutatingPlayer = (): any => (s.mutatingPlayer = true);
  const mutatedPlayer = (): any => (s.mutatingPlayer = false);

  const { watchPlayers, createPlayer, changePlayer } = usePlayerUsecases();

  useEffect(() => {
    let unsubscribe: WatchPlayersUsecase.Response;

    watchPlayers
      .execute((players) => (s.players = players))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, []);

  const openMutatePlayerModal = useCallback(
    (player?: PlayerModel) => {
      s.open = true;
      s.player = player;
      s.name = player?.name;
      s.color = player?.color;
      s.avatarIndex = player
        ? avatars.findIndex((avatar) => avatar === player.avatar)
        : 0;
    },
    [s.open],
  );

  const closeModal = (): any => {
    s.open = false;
    s.player = undefined;
    s.name = undefined;
    s.color = undefined;
    s.mutatingPlayer = false;
  };

  const avatar = avatars[s.avatarIndex];

  function handleAvatarButtonClick(event: MouseEvent<HTMLDivElement>): any {
    const clickX = event.nativeEvent.offsetX;
    const divWidth = event.currentTarget.clientWidth;
    const splitThreshold = divWidth / 2;

    if (clickX < splitThreshold) prevAvatar();
    else nextAvatar();
  }

  const submitDisabled = !s.name || !s.color || !avatar || s.mutatingPlayer;

  function handleSubmitButtonClick(): any {
    const { name, color } = s;

    if (!name || !color) return;

    mutatingPlayer();

    const promise = s.player
      ? changePlayer.execute({ name, color, avatar })
      : createPlayer.execute({ name, color, avatar });

    promise
      .then(onSuccess)
      .then(closeModal)
      .catch(alertError)
      .finally(mutatedPlayer);
  }

  function renderColors(): ReactNode {
    const otherPlayers = s.players.filter(
      (player) => player.id !== s.player?.id,
    );
    const availableColors = getAvailableColors(otherPlayers);

    return (
      <div className='colors'>
        {availableColors.map((color) => {
          const styledColor = getColor(color);

          return (
            <button
              key={color}
              className='color'
              style={{
                background: styledColor,
                borderBottomColor: darken(styledColor, 0.1),
                opacity: !s.color || s.color === color ? 1 : 0.2,
              }}
              onClick={(): any => {
                if (s.color === color) s.color = undefined;
                else s.color = color;
              }}
            />
          );
        })}
      </div>
    );
  }

  const title = s.player ? 'Edit player' : 'Create player';
  const submitButtonText = s.player ? 'Edit' : 'Create';

  return {
    openMutatePlayerModal,
    renderMutatePlayerModal: () => (
      <>
        {s.open && (
          <Container>
            <article
              className='modal'
              onClick={(e): any => e.stopPropagation()}
            >
              <header>
                <h2>{title}</h2>
                {!unclosable && <button onClick={closeModal}>x</button>}
              </header>

              <main>
                <div
                  className='avatar'
                  onClick={handleAvatarButtonClick}
                  style={{
                    background: s.color ? getColor(s.color) : 'lightgray',
                  }}
                >
                  {avatar}
                </div>

                <input
                  autoFocus
                  className='name'
                  placeholder='Name'
                  defaultValue={s.name}
                  onChange={(e): any => (s.name = e.target.value)}
                />

                {renderColors()}
              </main>

              <footer>
                {!unclosable && <button onClick={closeModal}>Cancel</button>}
                <button
                  disabled={submitDisabled}
                  onClick={handleSubmitButtonClick}
                >
                  {s.mutatingPlayer && (
                    <>
                      <span className='loading'>⏳</span>{' '}
                    </>
                  )}
                  {submitButtonText}
                </button>
              </footer>
            </article>
          </Container>
        )}
      </>
    ),
  };
}
