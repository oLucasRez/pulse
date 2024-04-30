import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import { useStates } from '@presentation/hooks';

import { DiceRollerProps } from './types';

import { Dice, useMapContext } from '..';

export const DiceRoller: FC<DiceRollerProps> = (props) => {
  const { dice, onRollDice } = props;

  const [s, set] = useStates({
    active: false,
    origin: null as Vector | null,
    target: null as Vector | null,
    vel: null as Vector | null,
    interval: undefined as NodeJS.Timer | undefined,
    value: 0,
  });

  const { mapSpace, bounds, limit, onMouseMove, onMouseDown, onMouseUp } =
    useMapContext();

  useEffect(
    () =>
      s.active && !s.vel
        ? onMouseDown((mouse) => {
            if (s.vel) return;

            s.origin = mouse;
            s.target = mouse;
          })
        : undefined,
    [s.active, !s.vel],
  );

  useEffect(
    () => (s.active && !s.vel ? onMouseMove(set('target')) : undefined),
    [s.active, !s.vel],
  );

  useEffect(
    () =>
      s.active && !s.vel
        ? onMouseUp((mouse) => {
            if (mouse.mag() > limit) {
              s.active = false;
              s.origin = null;
              s.target = null;

              return;
            }

            if (s.origin && s.target) {
              const vel = s.target.sub(s.origin);

              if (vel.mag() < 1) {
                alert('Click and drag to roll the dice');

                s.origin = null;
                s.target = null;

                return;
              }

              s.vel = vel;
            }
            s.origin = null;
          })
        : undefined,
    [s.active, !s.vel],
  );

  useEffect(() => {
    s.origin = null;
    s.target = null;
    s.vel = null;
    s.value = 0;
  }, [dice.id]);

  useEffect(() => {
    if (!s.vel || !s.target) return;

    s.interval = setInterval(() => {
      if (!s.vel || !s.target) return;

      const { right } = bounds;

      let newTarget = s.target.sum(s.vel);
      let newVel = s.vel.mult(0.9);

      if (newTarget.mag() > right) {
        newTarget = newTarget.norm().mult(right);
        newVel = newVel.bounce(newTarget);
      }

      s.target = newTarget;
      s.vel = newVel;
    }, 1000 / 30);

    return () => {
      clearInterval(s.interval);
    };
  }, [!s.vel]);

  useEffect(() => {
    if (s.vel && s.vel.mag() < 0.01) {
      if (s.target) onRollDice?.({ position: s.target });

      clearInterval(s.interval);
    }
  }, [s.vel]);

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

      {target && <Dice {...dice} position={s.target} />}

      {!target && (
        <Dice
          {...dice}
          position={new Vector([bounds.left + 1, bounds.bottom - 1])}
          onClick={set('active', true)}
        />
      )}
    </>
  );
};

export { RollDiceEvent } from './types';
