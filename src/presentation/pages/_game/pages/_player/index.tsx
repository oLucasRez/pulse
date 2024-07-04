import { FC, useEffect, useRef } from 'react';

import { RequiredError } from '@domain/errors';

import {
  BakingPaper,
  Button,
  Icon,
  IconButton,
  Input,
  Popover,
} from '@presentation/components';
import {
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useToast,
  useUser,
} from '@presentation/hooks';
import { ColorSelector } from '@presentation/pages/_game/components';

import { AvatarSelector } from './components';

import { PlayerExistsProxy } from './proxies';

import { Buttons, Content, OptionItem, PopoverContent } from './styles';

const PlayerPage: FC<PlayerExistsProxy.ChildrenProps> = ({ player }) => {
  const newPlayer = !player;

  const { me } = useUser();
  const { imHost } = useGame();

  const [s, set] = useStates({
    color: player?.color,
    avatar: player?.avatar,
    name: player?.name ?? me?.name ?? '',
    loading: false,
    editMode: newPlayer,
  });

  const { createPlayer, changePlayer, banPlayer } = usePlayer();

  const toast = useToast();

  const menuRef = useRef<IconButton.Element>(null);

  useEffect(() => {
    if (!player) return;
    s.color = player.color;
  }, [player?.color, s.editMode]);

  useEffect(() => {
    if (!player) return;
    s.avatar = player.avatar;
  }, [player?.avatar, s.editMode]);

  useEffect(() => {
    if (!player) return;
    s.name = player.name;
  }, [player?.name, s.editMode]);

  const { navigateToGame } = useNavigate();

  const isMyPlayer = newPlayer || (!!me && player?.uid === me.uid);

  function onSubmit() {
    const { name, color, avatar } = s;

    if (!isMyPlayer) return;

    if (!name)
      return toast.error(new RequiredError({ metadata: { entity: 'Name' } }));
    if (!color)
      return toast.error(new RequiredError({ metadata: { entity: 'Color' } }));
    if (!avatar)
      return toast.error(new RequiredError({ metadata: { entity: 'Avatar' } }));

    s.loading = true;

    const promise = newPlayer
      ? createPlayer({ name, color, avatar })
      : changePlayer({ name, color, avatar });

    promise
      .catch(toast.error)
      .finally(set('loading', false))
      .finally(navigateToGame);
  }

  function handleBanPlayerClick() {
    if (!player) return;

    s.loading = true;

    banPlayer(player.id).catch(toast.error).finally(set('loading', false));
  }

  const avatarSelectorDisabled = s.loading;
  const avatarSelectorReadonly = !isMyPlayer || !s.editMode;
  const nameInputDisabled = s.loading || !isMyPlayer || !s.editMode;
  const colorSelectorDisabled = s.loading || !s.editMode;
  const showColorSelector = isMyPlayer && s.editMode;
  const cancelDisabled = s.loading;
  const submitDisabled =
    !s.color ||
    !s.avatar ||
    !s.name ||
    s.loading ||
    (s.color === player?.color &&
      s.avatar === player.avatar &&
      s.name === player.name);
  const showCancelButton = !newPlayer;
  const showButtons = isMyPlayer && s.editMode;

  const showEditOption = isMyPlayer && !s.editMode;
  const showBanOption = imHost && !isMyPlayer;
  const showMenuOptions = showEditOption || showBanOption;

  return (
    <BakingPaper
      onClick={() => {
        if (newPlayer) return;
        if (s.editMode) return;

        navigateToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <AvatarSelector
          defaultValue={s.avatar}
          disabled={avatarSelectorDisabled}
          readOnly={avatarSelectorReadonly}
          onChange={set('avatar')}
        />
        <Input
          disabled={nameInputDisabled}
          color={s.color}
          variant='baking-paper'
          placeholder='Descreva...'
          label='Nome'
          defaultValue={s.name}
          value={s.name}
          onChange={set('name')}
        />
        {showColorSelector && (
          <ColorSelector
            defaultValue={s.color}
            disabled={colorSelectorDisabled}
            onChange={set('color')}
          />
        )}
        {showButtons && (
          <Buttons>
            {showCancelButton && (
              <Button
                disabled={cancelDisabled}
                onClick={set('editMode', false)}
              >
                Cancelar
              </Button>
            )}

            <Button
              color={s.color}
              disabled={submitDisabled}
              loading={s.loading}
              onClick={onSubmit}
            >
              {newPlayer ? 'Criar' : 'Editar'}
            </Button>
          </Buttons>
        )}

        {showMenuOptions && (
          <>
            <IconButton ref={menuRef} icon={<Icon.Options />} size='small' />

            <Popover anchorRef={menuRef}>
              <PopoverContent>
                {showEditOption && (
                  <OptionItem onClick={set('editMode', true)}>
                    <Icon.Pencil />
                    Editar
                  </OptionItem>
                )}
                {showBanOption && (
                  <OptionItem onClick={handleBanPlayerClick}>
                    <Icon.Block color='error' />
                    Banir jogador
                  </OptionItem>
                )}
              </PopoverContent>
            </Popover>
          </>
        )}
      </Content>
    </BakingPaper>
  );
};

export default PlayerPage;
