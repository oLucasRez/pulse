import { FC, FocusEvent, useRef } from 'react';
import { useOutlet } from 'react-router-dom';

import { Color } from '@domain/enums';

import {
  BakingPaper,
  Button,
  Icon,
  IconButton,
  Ripple,
} from '@presentation/components';
import {
  useGame,
  useNavigate,
  usePlayer,
  useStates,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { Map } from '../../components';

import {
  Avatar,
  Container,
  InviteContainer,
  InviteLabel,
  InviteLink,
  Name,
  Player,
  Players,
} from './styles';

export const InitialState: FC = () => {
  const [s, set] = useStates({
    settingsIsOpen: false,
    banningPlayer: false,
    startingGame: false,
  });

  const { currentGame, imHost, startGame } = useGame();
  const { players, myPlayer } = usePlayer();

  const { navigateToPlayer } = useNavigate();

  const isExactPath = !useOutlet();

  function handleLinkInputFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.select();
    event.target.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(event.target.value);
  }

  function handleStartButtonClick() {
    s.startingGame = true;
    startGame().catch(alertError).finally(set('startingGame', false));
  }

  function handleCopyLinkButtonClick() {
    linkInputRef.current?.focus();
  }

  const linkInputRef = useRef<HTMLInputElement>(null);

  function renderInvite() {
    if (!imHost)
      return <InviteLabel>Aguarde o host iniciar o jogo...</InviteLabel>;

    const reachedMaxPlayers = currentGame?.config.maxPlayers === players.length;

    if (reachedMaxPlayers) return;

    return (
      <>
        <InviteLabel>Convide seus amigos para entrar no jogo!</InviteLabel>
        <InviteContainer>
          <InviteLink value={location.href} onFocus={handleLinkInputFocus} />
          <IconButton
            icon={<Icon.Copy />}
            size='small'
            onClick={handleCopyLinkButtonClick}
          />
        </InviteContainer>
      </>
    );
  }

  function renderPlayers() {
    return (
      <Players>
        {players.map(({ id, avatar, color, name }) => (
          <Player key={id}>
            <Ripple>
              <Avatar onClick={() => navigateToPlayer(id)} icon={avatar} />
            </Ripple>
            <Name $color={color}>{name}</Name>
          </Player>
        ))}
        {players.length < 3 &&
          Array.from({ length: 3 - players.length }).map((_, i) => (
            <Player key={i}>
              <Avatar icon='' $empty />
              <Name $color={Color.GREY}>Jogador {players.length + i + 1}</Name>
            </Player>
          ))}
      </Players>
    );
  }

  const showStartButton = imHost;
  const startButtonLoading = s.startingGame;
  const startButtonDisabled = s.startingGame || players.length < 3;

  return (
    <Map outsideSVG>
      {!!myPlayer && (
        <BakingPaper>
          <Container $hidden={!isExactPath}>
            {renderInvite()}

            {renderPlayers()}

            {showStartButton && (
              <Button
                onClick={handleStartButtonClick}
                loading={startButtonLoading}
                disabled={startButtonDisabled}
              >
                Começar
              </Button>
            )}
          </Container>
        </BakingPaper>
      )}
    </Map>
  );
};
