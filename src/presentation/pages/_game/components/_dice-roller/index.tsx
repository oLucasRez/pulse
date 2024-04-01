import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import { useRoundUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';

import { DiceRollerProps } from './types';

import { Dice, useMapContext } from '..';

export const DiceRoller: FC<DiceRollerProps> = (props) => {
  const { onRollDice } = props;

  const [s] = useStates({
    origin: null as Vector | null,
    target: null as Vector | null,
    vel: null as Vector | null,
    interval: undefined as NodeJS.Timer | undefined,
    value: 0,
  });

  const { currentPlayer, currentDice } = useRoundUsecases();

  const { mapSpace, bounds, onMouseMove, onMouseDown, onMouseUp } =
    useMapContext();

  useEffect(
    () =>
      onMouseDown((mouse) => {
        if (s.vel) return;

        s.origin = mouse;
        s.target = mouse;
      }),
    [],
  );

  useEffect(
    () =>
      onMouseMove((mouse) => {
        if (s.vel) return;

        s.target = s.origin && mouse;
      }),
    [],
  );

  useEffect(
    () =>
      onMouseUp(() => {
        if (s.vel) return;

        if (s.origin && s.target) {
          const vel = s.target.sub(s.origin);

          if (vel.mag() < 5) {
            alert('Click and drag to roll the dice');

            s.origin = null;
            s.target = null;

            return;
          }

          s.vel = vel;
        }
        s.origin = null;
      }),
    [],
  );

  useEffect(() => {
    s.origin = null;
    s.target = null;
    s.vel = null;
    s.value = 0;
  }, [currentDice?.id]);

  useEffect(() => {
    if (!s.vel || !s.target) return;

    s.interval = setInterval(() => {
      if (!s.vel || !s.target) return;

      const { left, right, top, bottom } = bounds;

      let newTarget = s.target.sum(s.vel);
      let newVel = s.vel.mult(0.9);

      if (left > newTarget.x || right < newTarget.x) {
        newVel = newVel.flip('x');
        if (left > newTarget.x) newTarget = new Vector([left, newTarget.y]);
        if (right < newTarget.x) newTarget = new Vector([right, newTarget.y]);
      }
      if (top > newTarget.y || bottom < newTarget.y) {
        newVel = newVel.flip('y');
        if (top > newTarget.y) newTarget = new Vector([newTarget.x, top]);
        if (bottom < newTarget.y) newTarget = new Vector([newTarget.x, bottom]);
      }

      s.target = newTarget;
      s.vel = newVel;
    }, 1000 / 30);

    return () => {
      clearInterval(s.interval);
    };
  }, [!!s.vel]);

  useEffect(() => {
    if (s.vel && s.vel.mag() < 0.01) {
      if (currentDice && s.target)
        onRollDice?.({ position: s.target, dice: currentDice });

      clearInterval(s.interval);
    }
  }, [s.vel]);

  if (!currentPlayer) return null;

  const origin = s.origin && mapSpace.mult(s.origin);
  const target = s.target && mapSpace.mult(s.target);

  return (
    <>
      {origin && target && (
        <line
          x1={origin.x}
          y1={origin.y}
          x2={target.x}
          y2={target.y}
          stroke='darkgray'
          strokeDasharray='5 5'
        />
      )}

      {target && currentDice && <Dice {...currentDice} position={s.target} />}
    </>
  );
};

export { RollDiceEvent } from './types';
