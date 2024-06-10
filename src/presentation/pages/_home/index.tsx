import { FC } from 'react';

import { PulseLogo } from '@presentation/assets';
import { Icon, IconButton } from '@presentation/components';
import { useGame, useNavigate, useStates } from '@presentation/hooks';

import { Body, Container, Label } from './styles';

const HomePage: FC = () => {
  const [s, set] = useStates({
    creatingGame: false,
  });

  const { navigateToGame } = useNavigate();

  const { createGame } = useGame();

  function handleCreateGameButtonClick() {
    s.creatingGame = true;

    createGame({
      config: { maxPlayers: 5, withLightSpot: true, dicesMode: 'growing' },
    })
      .then((game) => navigateToGame(game.id))
      .finally(set('creatingGame', false));
  }

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
