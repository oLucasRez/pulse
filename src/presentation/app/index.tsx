import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { Game } from '@domain/models';

import { Container } from './styles';

interface AppProps {
  snapshots: {
    game: Game.DTO;
  }[];
}
/**
 * Ponto de partida da aplicação.
 */
const App: FC<AppProps> = ({ snapshots }) => {
  const [i, setI] = useState(0);

  const snapshot = useMemo(() => snapshots[i], [i]);

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setI((prevI) => (prevI + 1) % snapshots.length),
  //     1000,
  //   );

  //   return () => clearInterval(interval);
  // }, []);

  function translate(value: number): number {
    return value + 300;
  }

  function scale(value: number): number {
    return value * 20;
  }

  function renderPulses(): ReactNode {
    return snapshot.game.pulses.map((pulse, i) => {
      const subject = snapshot.game.subjects.find(
        (subject) => subject.id === pulse.landmarkID,
      );

      const color = subject?.color ?? 'gray';

      return (
        <g key={i}>
          {pulse.circles.map((circle, j) => (
            <circle
              key={`${i}:${j}`}
              cx={translate(scale(circle.c.x))}
              cy={translate(scale(circle.c.y))}
              r={scale(circle.r)}
              fill='transparent'
              stroke={color}
            />
          ))}
        </g>
      );
    });
  }

  function renderOrigins(): ReactNode {
    return snapshot.game.pulses.map((pulse, i) => {
      const subject = snapshot.game.subjects.find(
        (subject) => subject.id === pulse.landmarkID,
      );

      const color = subject?.color ?? 'grey';

      return (
        <circle
          key={i}
          cx={translate(scale(pulse.origin.x))}
          cy={translate(scale(pulse.origin.y))}
          r={3}
          fill={color}
        />
      );
    });
  }

  function renderDices(): ReactNode {
    return snapshot.game.dices.map((dice, i) => {
      const player = snapshot.game.players.find(
        (player) => player.id === dice.ownerID,
      );

      const color = player?.color ?? 'grey';

      if (!dice.position) return null;

      return (
        <rect
          key={i}
          style={{ transition: '0.2s' }}
          x={translate(scale(dice.position.x)) - 5}
          y={translate(scale(dice.position.y)) - 5}
          width={10}
          height={10}
          fill={color}
        />
      );
    });
  }

  return (
    <Container>
      <button onClick={() => setI((prevI) => (prevI + 1) % snapshots.length)}>
        NEXT
      </button>
      <svg width={600} height={600}>
        {renderPulses()}
        {renderOrigins()}
        {renderDices()}
      </svg>
    </Container>
  );
};

export { App };
