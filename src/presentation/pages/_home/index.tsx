import { FC, useEffect } from 'react';

import { PulseLogo } from '@presentation/assets';
import { Icon, IconButton } from '@presentation/components';
import {
  useGame,
  useNavigate,
  useStates,
  useToast,
  useUser,
} from '@presentation/hooks';

import { Body, Container, Label } from './styles';

const HomePage: FC = () => {
  const [s, set] = useStates({
    creatingGame: false,
  });

  const { navigateToGame } = useNavigate();

  const { games, createGame } = useGame();
  const { me } = useUser();

  function handleCreateGameButtonClick() {
    s.creatingGame = true;

    createGame({
      config: { maxPlayers: 5, withLightSpot: true, dicesMode: 'growing' },
    })
      .then((game) => navigateToGame(game.id))
      .finally(set('creatingGame', false));
  }

  const toast = useToast();

  useEffect(() => {
    const currentGame = games.find((game) => game.id === me?.currentGameID);
    if (!currentGame) return;

    toast.fire('notification', {
      id: 'return-to-game',
      title: 'Voltar ao jogo',
      description: 'Você estava em um jogo anteriormente, deseja voltar?',
      position: 'bottom-right',
      actionLabel: 'Voltar',
      action: () => {
        navigateToGame(currentGame.id);
        toast.dismiss('return-to-game');
      },
    });
  }, [me?.currentGameID]);

  return (
    <Container>
      <PulseLogo />
      <Body>
        <Label>Criar jogo instantâneo</Label>
        <IconButton
          icon={<Icon.Plus />}
          size='large'
          onClick={handleCreateGameButtonClick}
          loading={s.creatingGame}
        />
      </Body>
    </Container>
  );
};

export default HomePage;
