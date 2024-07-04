import { FC } from 'react';

import { Vector } from '@domain/utils';

import { Text, Transition } from '@presentation/components';
import {
  useGame,
  useNavigate,
  usePlayer,
  useRound,
  useStates,
} from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { useMapContext } from '../_map';

export const Round: FC = () => {
  const [s, set] = useStates({
    active: null as string | null,
  });

  const { navigateToPlayer } = useNavigate();

  const { players, currentPlayer } = usePlayer();
  const { round } = useRound();
  const { currentGame } = useGame();

  const { width } = useMapContext();

  const r = 40;
  const position = new Vector([width, 0]).sum(-(32 + r), 32 + r);
  const clockwise = round?.clockwise === 'clockwise' ? 1 : 0;

  const currentI = currentPlayer?.order ?? 0;

  const arcStart = position.sum(
    new Vector([
      Math.cos(((2 * Math.PI) / players.length) * currentI),
      Math.sin(((2 * Math.PI) / players.length) * currentI),
    ]).mult(r),
  );
  const arcEnd = position.sum(
    new Vector([
      Math.cos(
        ((2 * Math.PI) / players.length) *
          (currentI + (clockwise || -1) * (currentGame?.stateProgress || 1)),
      ),
      Math.sin(
        ((2 * Math.PI) / players.length) *
          (currentI + (clockwise || -1) * (currentGame?.stateProgress || 1)),
      ),
    ]).mult(r),
  );

  return (
    <>
      <circle
        cx={position.x}
        cy={position.y}
        r={r}
        stroke={getColor()}
        opacity={0.5}
        strokeWidth={1}
        fill='none'
        strokeDasharray='3'
      />

      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 ${clockwise} ${arcEnd.x} ${arcEnd.y}`}
        stroke={getColor(currentPlayer?.color)}
        strokeWidth={2}
        fill='none'
        // style={{
        //   transform: `rotate(${(360 / players.length) * 1}deg)`,
        // }}
      />

      {players.map((player, i) => (
        <Transition.Scale
          key={player.id}
          active={s.active === player.id}
          activeFactor={player.id === currentPlayer?.id ? 1.1 : 1.3}
          ms={100}
        >
          <Text
            // style
            className='handwriting'
            textAnchor='middle'
            alignmentBaseline='middle'
            fill={player.avatar}
            stroke='white'
            cursor='pointer'
            strokeWidth={3}
            style={{
              transform: `translate(${
                Math.cos((2 * Math.PI) / (i + 1)) * r
              }px, ${Math.sin((2 * Math.PI) / (i + 1)) * r}px)`,
              fontSize: player.id === currentPlayer?.id ? '2rem' : undefined,
            }}
            // params
            x={position.x}
            y={position.y}
            // handle
            onMouseEnter={set('active', player.id)}
            onMouseOut={set('active', null)}
            onMouseLeave={set('active', null)}
            onClick={() => navigateToPlayer(player.id)}
          >
            {player.avatar}
          </Text>
        </Transition.Scale>
      ))}
    </>
  );
};
