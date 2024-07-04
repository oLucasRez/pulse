import { FC, Fragment, ReactNode, useEffect, useRef } from 'react';

import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

import { Button } from '@presentation/components';
import {
  useGame,
  useNavigate,
  useStates,
  useToast,
  useUser,
} from '@presentation/hooks';

import { BackgroundPattern, Container, PulseLogo, Version } from './styles';

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

    if (!currentGame) {
      toast.dismiss('return-to-game');
      return;
    }

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
  }, [me?.currentGameID, games]);

  const containerRef = useRef<HTMLDivElement>(null);

  function renderCircles() {
    const circles: ReactNode[] = [];

    const containerWidth = containerRef.current?.clientWidth || 0;
    const containerHeight = containerRef.current?.clientHeight || 0;
    const containerSize = new Vector([containerWidth, containerHeight]);

    const gap = 10;

    for (
      let i = 0;
      i < Math.floor((containerWidth * containerHeight) / 10000);
      i++
    ) {
      const amount = Math.floor(Math.random() * 10) + 1;
      const pos = containerSize.mult(Math.random(), Math.random());

      circles.push(
        <Fragment key={i}>
          <circle cx={pos.x} cy={pos.y} r='2' className='filled' />

          {Array.from({ length: amount }).map((_, j) => (
            <circle
              key={j}
              cx={pos.x}
              cy={pos.y}
              r={gap * (j + 1)}
              className='outlined'
            />
          ))}
        </Fragment>,
      );
    }

    return (
      <BackgroundPattern $width={containerWidth} $height={containerHeight}>
        {circles}
      </BackgroundPattern>
    );
  }

  return (
    <Container ref={containerRef}>
      {renderCircles()}

      <PulseLogo />

      <Version>v. alpha</Version>

      <Button
        size='large'
        color={Color.ORANGE}
        onClick={handleCreateGameButtonClick}
        loading={s.creatingGame}
      >
        Novo jogo
      </Button>
    </Container>
  );
};

export default HomePage;
