import { FC } from 'react';

import { useDice } from '@presentation/hooks';
import { darken, getColor, lighten } from '@presentation/styles/mixins';

import { DiceProps, DicesProps } from './types';

import { useMapContext } from '..';

const d4Edge = 40;
const d6Edge = 20;
const d8Edge = 20;

export const Dice: FC<DiceProps> = ({
  value,
  sides,
  transparent = false,
  color,
  overloaded,
  onClick,
  ...props
}) => {
  const { mapSpace } = useMapContext();

  const position = props.position && mapSpace.mult(props.position);

  if (!position || !color) return null;

  if (sides === 4)
    return (
      <g
        opacity={(transparent ? 0.5 : 1) * (overloaded ? 0.5 : 1)}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
      >
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
          stroke={transparent ? getColor(color) : undefined}
          fill={transparent ? 'none' : lighten(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} l${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          }`}
          stroke={transparent ? getColor(color) : undefined}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} l${d4Edge / 2},${
            (d4Edge * Math.sqrt(3)) / 6
          } h-${d4Edge} z`}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.1)}
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
          stroke={transparent ? getColor(color) : undefined}
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
      <g
        opacity={(transparent ? 0.5 : 1) * (overloaded ? 0.5 : 1)}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
          fill={transparent ? 'none' : lighten(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} v-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2}`}
          fill='none'
          stroke={transparent ? getColor(color) : undefined}
        />
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} v-${d6Edge} l-${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v${d6Edge} z`}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.1)}
        />
        <path
          d={`M${position.x},${position.y} v${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge}`}
          opacity={transparent ? 0.5 : 1}
          stroke='none'
          fill={transparent ? getColor(color) : getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} l${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          }`}
          fill='none'
          stroke={transparent ? getColor(color) : undefined}
        />
        <path
          d={`M${position.x},${position.y} m0,${d6Edge} l${
            (d6Edge * Math.sqrt(3)) / 2
          },-${d6Edge / 2} v-${d6Edge} l-${(d6Edge * Math.sqrt(3)) / 2},-${
            d6Edge / 2
          } l-${(d6Edge * Math.sqrt(3)) / 2},${d6Edge / 2} v${d6Edge} z`}
          stroke={transparent ? getColor(color) : undefined}
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
      <g
        opacity={(transparent ? 0.5 : 1) * (overloaded ? 0.5 : 1)}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <path
          d={`M${position.x},${position.y} m0,${d8Edge} l${
            (d8Edge * Math.sqrt(3)) / 2
          },-${d8Edge / 2} v-${d8Edge} l-${(d8Edge * Math.sqrt(3)) / 2},-${
            d8Edge / 2
          } l-${(d8Edge * Math.sqrt(3)) / 2},${d8Edge / 2} v${d8Edge} z`}
          fill={transparent ? 'none' : lighten(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d8Edge} l-${
            (d8Edge * Math.sqrt(3)) / 2
          },${(d8Edge * 3) / 2} h${d8Edge * Math.sqrt(3)} l-${
            (d8Edge * Math.sqrt(3)) / 2
          },-${(d8Edge * 3) / 2}`}
          fill='none'
          stroke={transparent ? getColor(color) : undefined}
        />
        <path
          d={`M${position.x},${position.y} m-${(d8Edge * Math.sqrt(3)) / 2},${
            d8Edge / 2
          } l${(d8Edge * Math.sqrt(3)) / 2},${d8Edge / 2} l${
            (d8Edge * Math.sqrt(3)) / 2
          },-${d8Edge / 2} z`}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.1)}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d8Edge} l${
            (d8Edge * Math.sqrt(3)) / 2
          },${(d8Edge * 3) / 2} v-${d8Edge}`}
          opacity={transparent ? 0.5 : 1}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.05)}
        />
        <path
          d={`M${position.x},${position.y} m0,-${d8Edge} l-${
            (d8Edge * Math.sqrt(3)) / 2
          },${(d8Edge * 3) / 2} h${d8Edge * Math.sqrt(3)}`}
          opacity={transparent ? 0.25 : 1}
          stroke='none'
          fill={getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} m0,${d8Edge} l${
            (d8Edge * Math.sqrt(3)) / 2
          },-${d8Edge / 2} v-${d8Edge} l-${(d8Edge * Math.sqrt(3)) / 2},-${
            d8Edge / 2
          } l-${(d8Edge * Math.sqrt(3)) / 2},${d8Edge / 2} v${d8Edge} z`}
          stroke={transparent ? getColor(color) : undefined}
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

export const Dices: FC<DicesProps> = ({ transparent, hidden }) => {
  const { dices } = useDice();

  return (
    <>
      {dices.map((dice) => {
        if (hidden && dice.id === hidden) return null;

        return <Dice key={dice.id} transparent={transparent} {...dice} />;
      })}
    </>
  );
};
