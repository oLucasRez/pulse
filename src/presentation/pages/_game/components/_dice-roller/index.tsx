import { FC, MouseEventHandler, useEffect, useRef } from 'react';

import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

import { useDiceUsecases, useRoundUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { darken, getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { Container } from './styles';

import { DiceRollerProps } from './types';

const d4Edge = 60;
const d6Edge = 30;

interface DProps {
  color: Color;
  position: Vector;
}

const D4: FC<DProps> = (props) => {
  const { color, position } = props;

  return (
    <g>
      <path
        d={`M${position.x},${position.y} m-${d4Edge / 2},${
          (d4Edge * Math.sqrt(3)) / 6
        } h${d4Edge} l-${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 2} l-${
          d4Edge / 2
        },${(d4Edge * Math.sqrt(3)) / 2}`}
        fill={getColor(color)}
      />
      <path
        d={`M${position.x},${position.y} m-${d4Edge / 2},${
          (d4Edge * Math.sqrt(3)) / 6
        } l${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 6} v-${
          (d4Edge * Math.sqrt(3)) / 3
        }`}
        stroke={darken(getColor(color), 0.2)}
        fill={getColor(color)}
      />
      <path
        d={`M${position.x},${position.y} l${d4Edge / 2},${
          (d4Edge * Math.sqrt(3)) / 6
        }`}
        stroke={darken(getColor(color), 0.2)}
        fill={getColor(color)}
      />
      <path
        d={`M${position.x},${position.y} m-${d4Edge / 2},${
          (d4Edge * Math.sqrt(3)) / 6
        } h${d4Edge} l-${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 2} l-${
          d4Edge / 2
        },${(d4Edge * Math.sqrt(3)) / 2}`}
        stroke={getColor(color)}
        fill='none'
      />
    </g>
  );
};

const D6: FC<DProps> = (props) => {
  const { color, position } = props;

  return (
    <g>
      <path
        d={`M${position.x},${position.y} m0,${d6Edge} l${
          (d6Edge * Math.sqrt(3)) / 2
        },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
          d6Edge / 2
        } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
        fill={getColor(color)}
      />
      <path
        d={`M${position.x},${position.y} m0,${d6Edge} v-${d6Edge} l-${
          (d6Edge * Math.sqrt(3)) / 2
        },-${d6Edge / 2}`}
        fill='none'
        stroke={darken(getColor(color), 0.2)}
      />
      <path
        d={`M${position.x},${position.y} l${(d6Edge * Math.sqrt(3)) / 2},-${
          d6Edge / 2
        }`}
        fill='none'
        stroke={darken(getColor(color), 0.2)}
      />
      <path
        d={`M${position.x},${position.y} m0,${d6Edge} l${
          (d6Edge * Math.sqrt(3)) / 2
        },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
          d6Edge / 2
        } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
        stroke={getColor(color)}
        fill='none'
      />
    </g>
  );
};

export const DiceRoller: FC<DiceRollerProps> = (props) => {
  const { onDiceRolled } = props;

  const [s] = useStates({
    origin: null as Vector | null,
    target: null as Vector | null,
    vel: null as Vector | null,
    interval: undefined as NodeJS.Timer | undefined,
    value: 0,
  });

  const { rollDice } = useDiceUsecases();

  const ref = useRef<SVGSVGElement>(null);
  const container = ref.current;

  const { currentPlayer, currentDice } = useRoundUsecases();

  const handleMouseDown: MouseEventHandler<SVGSVGElement> = (event) => {
    if (s.vel) return;

    const { x, y } = event.currentTarget.getBoundingClientRect();

    const vector = new Vector([event.clientX - x, event.clientY - y]);
    s.origin = vector;
    s.target = vector;
  };
  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (event) => {
    if (s.vel) return;

    const { x, y } = event.currentTarget.getBoundingClientRect();

    s.target = s.origin && new Vector([event.clientX - x, event.clientY - y]);
  };
  const handleMouseUp: MouseEventHandler<SVGSVGElement> = () => {
    if (s.vel) return;

    if (s.origin && s.target) s.vel = s.target.sub(s.origin);
    s.origin = null;
  };

  useEffect(() => {
    if (!s.vel || !s.target) return;

    s.interval = setInterval(() => {
      if (!s.vel || !s.target || !container) return;

      const { left, top, right, bottom } = container.getBoundingClientRect();

      const fixedLeft = 0;
      const fixedRight = right - left;
      const fixedTop = 0;
      const fixedBottom = bottom - top;

      let newTarget = s.target.sum(s.vel);
      let newVel = s.vel.mult(0.9);

      if (fixedLeft > newTarget.x || fixedRight < newTarget.x) {
        newVel = newVel.flip('x');
        if (fixedLeft > newTarget.x)
          newTarget = new Vector([fixedLeft, newTarget.y]);
        if (fixedRight < newTarget.x)
          newTarget = new Vector([fixedRight, newTarget.y]);
      }
      if (fixedTop > newTarget.y || fixedBottom < newTarget.y) {
        newVel = newVel.flip('y');
        if (fixedTop > newTarget.y)
          newTarget = new Vector([newTarget.x, fixedTop]);
        if (fixedBottom < newTarget.y)
          newTarget = new Vector([newTarget.x, fixedBottom]);
      }

      s.target = newTarget;
      s.vel = newVel;
    }, 1000 / 30);

    return () => {
      clearInterval(s.interval);
    };
  }, [!!s.vel]);

  useEffect(() => {
    if (s.vel && s.vel.mod() < 1) {
      if (currentDice && s.target)
        rollDice(currentDice.id, s.target)
          .then((dice) => dice.value && onDiceRolled?.(dice.value, dice))
          .catch(alertError);
      clearInterval(s.interval);
    }
  }, [s.vel]);

  if (!currentPlayer) return null;

  return (
    <Container
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {s.origin && s.target && (
        <line x1={s.origin.x} y1={s.origin.y} x2={s.target.x} y2={s.target.y} />
      )}

      {s.target &&
        currentDice &&
        (currentDice.sides === 4 ? (
          <D4 color={currentPlayer.color} position={s.target} />
        ) : currentDice.sides === 6 ? (
          <D6 color={currentPlayer.color} position={s.target} />
        ) : null)}

      {!!currentDice?.value && s.target && (
        <text x={s.target.x} y={s.target.y}>
          {currentDice.value}
        </text>
      )}
    </Container>
  );
};
