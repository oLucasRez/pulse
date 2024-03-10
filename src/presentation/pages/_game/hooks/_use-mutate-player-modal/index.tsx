import { MouseEvent, ReactNode, useCallback } from 'react';

import { PlayerModel } from '@domain/models';
import { getAvailableColors } from '@domain/utils';

import { useAuthUsecases, usePlayerUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { darken, getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { Container } from './styles';

import {
  MutatePlayerModalHookProps,
  MutatePlayerModalHookReturn,
} from './types';

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

  const { me } = useAuthUsecases();

  const [s, set] = useStates({
    open,
    player,
    name: (player?.name || me?.name) as string | undefined,
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

  const { players, createPlayer, changePlayer } = usePlayerUsecases();

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

    set('mutatingPlayer')(true);

    const promise = s.player
      ? changePlayer({ name, color, avatar })
      : createPlayer({ name, color, avatar });

    promise
      .then(onSuccess)
      .then(closeModal)
      .catch(alertError)
      .finally(set('mutatingPlayer', false));
  }

  function renderColors(): ReactNode {
    const otherPlayers = players.filter((player) => player.id !== s.player?.id);
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
