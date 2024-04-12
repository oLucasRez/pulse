import { FC, useMemo } from 'react';

import {
  useDiceUsecases,
  usePlayerUsecases,
  useRoundUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { darken, getColor } from '@presentation/styles/mixins';

import { DiceProps, DicesProps } from './types';

import { useMapContext } from '..';

const d4Edge = 40;
const d6Edge = 20;

export const Dice: FC<DiceProps> = (props) => {
  const { value, sides, ownerID, transparent = false } = props;

  const { mapSpace } = useMapContext();

  const { players } = usePlayerUsecases();
  const { subjects } = useSubjectUsecases();

  const color = useMemo(
    () =>
      (ownerID && players.find((value) => value.id === ownerID)?.color) || null,
    [ownerID, players],
  );

  const position = useMemo(() => {
    if (props.position) return mapSpace.mult(props.position);

    const player = players.find((player) => player.id === ownerID);

    if (!player) return null;

    const subject = subjects.find((subject) => subject.id === player.subjectID);

    return subject?.position ? mapSpace.mult(subject.position) : null;
  }, [mapSpace, props.position, players, subjects]);

  if (!position || !color) return null;

  if (sides === 4)
    return (
      <g opacity={transparent ? 0.5 : 1}>
        <path
          d={`M${position.x},${position.y} m-${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          } h${d4Edge} l-${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 2} l-${
            d4Edge / 2
          },${(d4Edge * Math.sqrt(3)) / 2}`}
          fill={transparent ? 'none' : getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} m-${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          } l${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 6} v-${
            (d4Edge * Math.sqrt(3)) / 3
          }`}
          stroke={transparent ? getColor(color) : darken(getColor(color), 0.2)}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} l${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          }`}
          stroke={transparent ? getColor(color) : darken(getColor(color), 0.2)}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} l${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          } h-${d4Edge} z`}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
        />
        <path
          d={`M${position.x},${position.y} l${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          } l-${d4Edge / 2},-${(d4Edge * Math.sqrt(3)) / 2}`}
          opacity={0.5}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
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

        {value && !transparent && (
          <text
            style={{
              textAnchor: 'middle',
              alignmentBaseline: 'middle',
              fill: 'white',
            }}
            x={position.x}
            y={position.y}
          >
            {value}
          </text>
        )}
      </g>
    );

  if (sides === 6)
    return (
      <g opacity={transparent ? 0.5 : 1}>
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
          fill={transparent ? 'none' : getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} v-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2}`}
          fill='none'
          stroke={transparent ? getColor(color) : darken(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} v-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v${d6Edge} z`}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
        />
        <path
          d={`M${position.x},${position.y} v${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge}`}
          opacity={0.5}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
        />
        <path
          d={`M${position.x},${position.y} l${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          }`}
          fill='none'
          stroke={transparent ? getColor(color) : darken(getColor(color), 0.2)}
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

        {value && !transparent && (
          <text
            style={{
              textAnchor: 'middle',
              alignmentBaseline: 'middle',
              fill: 'white',
            }}
            x={position.x}
            y={position.y}
          >
            {value}
          </text>
        )}
      </g>
    );

  if (sides === 8)
    return (
      <g opacity={transparent ? 0.5 : 1}>
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
          fill={transparent ? 'none' : getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },${(d6Edge * 3) / 2} h${d6Edge * Math.sqrt(3)} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },-${(d6Edge * 3) / 2}`}
          fill='none'
          stroke={transparent ? getColor(color) : darken(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} m-${(d6Edge * Math.sqrt(3)) / 2},${
            d6Edge / 2
          } l${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} z`}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },${(d6Edge * 3) / 2} v-${d6Edge}`}
          opacity={0.5}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },${(d6Edge * 3) / 2} h${d6Edge * Math.sqrt(3)}`}
          opacity={0.25}
          stroke='none'
          fill={transparent ? getColor(color) : 'none'}
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
        {value && !transparent && (
          <text
            style={{
              textAnchor: 'middle',
              alignmentBaseline: 'middle',
              fill: 'white',
            }}
            x={position.x}
            y={position.y}
          >
            {value}
          </text>
        )}
      </g>
    );

  return null;
};

export const Dices: FC<DicesProps> = (props) => {
  const { position, transparent, currentHidden } = props;

  const { currentDice } = useRoundUsecases();
  const { dices } = useDiceUsecases();

  return (
    <>
      {dices.map((dice) => {
        if (currentHidden && dice.id === currentDice?.id) return null;

        return (
          <Dice
            key={dice.id}
            transparent={transparent}
            position={position}
            {...dice}
          />
        );
      })}
    </>
  );
};
