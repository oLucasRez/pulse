import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import { useStates, useToast } from '@presentation/hooks';
import { isTouchDevice } from '@presentation/utils';

import { DiceRollerProps } from './types';

import { Dice, useMapContext } from '..';

const dragTipID = 'dice-roller-drag';
const hitAreaRadius = 28;

export const DiceRoller: FC<DiceRollerProps> = (props) => {
  const { dice, onRollDice } = props;

  const [s, set] = useStates({
    active: false,
    origin: null as Vector | null,
    target: null as Vector | null,
    vel: null as Vector | null,
    interval: undefined as ReturnType<typeof setInterval> | undefined,
    value: 0,
  });

  const { mapSpace, bounds, limit, onPointerMove, onPointerDown, onPointerUp } =
    useMapContext();

  const toast = useToast();

  useEffect(() => () => toast.dismiss(dragTipID), []);

  useEffect(
    () =>
      s.active && !s.vel
        ? onPointerDown((pointer) => {
            if (s.vel) return;

            s.origin = pointer;
            s.target = pointer;
          })
        : undefined,
    [s.active, !s.vel],
  );

  useEffect(
    () => (s.active && !s.vel ? onPointerMove(set('target')) : undefined),
    [s.active, !s.vel],
  );

  useEffect(
    () =>
      s.active && !s.vel
        ? onPointerUp((pointer) => {
            if (pointer.mag() > limit) {
              s.active = false;
              s.origin = null;
              s.target = null;

              return;
            }

            if (s.origin && s.target) {
              const vel = s.target.sub(s.origin);

              if (vel.mag() < 1) {
                toast.fire('tip', {
                  id: dragTipID,
                  description: (
                    <p>
                      {isTouchDevice()
                        ? 'Toque e arraste dentro do mapa para dar impulso ao dado. Solte para lançá-lo.'
                        : 'Clique e arraste dentro do mapa para dar impulso ao dado. Solte para lançá-lo.'}
                    </p>
                  ),
                });

                s.origin = null;
                s.target = null;

                return;
              }

              toast.dismiss(dragTipID);

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

  const restPosition = new Vector([bounds.left + 1, bounds.bottom - 1]);
  const parsedRestPosition = mapSpace.mult(restPosition);

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
        <g pointerEvents={s.active ? 'none' : undefined}>
          <Dice
            {...dice}
            position={restPosition}
            onClick={set('active', true)}
          />

          {s.active && (
            <circle
              cx={parsedRestPosition.x}
              cy={parsedRestPosition.y}
              r={hitAreaRadius}
              fill='none'
              stroke='darkgray'
              strokeDasharray='5 5'
            />
          )}

          <circle
            cx={parsedRestPosition.x}
            cy={parsedRestPosition.y}
            r={hitAreaRadius}
            fill='transparent'
            cursor='pointer'
            onClick={set('active', true)}
          />
        </g>
      )}
    </>
  );
};

export { RollDiceEvent } from './types';
