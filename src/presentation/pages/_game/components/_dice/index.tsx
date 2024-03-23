import { FC, useMemo } from 'react';

import { usePlayerUsecases } from '@presentation/contexts';
import { darken, getColor } from '@presentation/styles/mixins';

import { DiceProps } from './types';

import { useMapContext } from '..';

const d4Edge = 40;
const d6Edge = 20;

export const Dice: FC<DiceProps> = (props) => {
  const { value, sides, ownerID } = props;

  const { mapSpace } = useMapContext();

  const { players } = usePlayerUsecases();

  const color = useMemo(
    () =>
      (ownerID && players.find((value) => value.id === ownerID)?.color) || null,
    [ownerID, players],
  );

  const position = props.position && mapSpace.mult(props.position);

  if (!position || !color) return null;

  if (sides === 4)
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

        {value && (
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

        {value && (
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
