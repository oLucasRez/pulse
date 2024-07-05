import { FC } from 'react';

import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

import { useDice } from '@presentation/hooks';
import { darken, getColor, lighten } from '@presentation/styles/mixins';

import { DiceProps, DicesProps } from './types';

import { useMapContext } from '..';

const d4Edge = 40;
const d6Edge = 20;
const d8Edge = 20;
const d10Edge = 20;
const d12Edge = 20;

const turn = 2 * Math.PI;

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
        strokeLinejoin='round'
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
        strokeLinejoin='round'
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
        strokeLinejoin='round'
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
            y={position.y + 2}
          >
            {value}
          </text>
        )}
      </g>
    );

  if (sides === 10)
    return (
      <g
        opacity={(transparent ? 0.5 : 1) * (overloaded ? 0.5 : 1)}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        strokeLinejoin='round'
      >
        <path
          d={`M${position.x},${position.y} m0,${d10Edge} l${d10Edge},-${
            (d10Edge * 2) / 3
          } v-${(d10Edge * 2) / 3} l-${d10Edge},-${
            (d10Edge * 2) / 3
          } l-${d10Edge},${(d10Edge * 2) / 3} v${(d10Edge * 2) / 3} z`}
          stroke={transparent ? getColor(color) : undefined}
          fill={transparent ? 'none' : getColor(color)}
        />
        <path
          d={`M${position.x},${position.y} m-${(d10Edge * 2) / 3},${
            d10Edge / 3
          } l${(d10Edge * 2) / 3},-${(d10Edge * 4) / 3} l${(d10Edge * 2) / 3},${
            (d10Edge * 4) / 3
          }  l-${(d10Edge * 2) / 3},${d10Edge / 3} z`}
          stroke='none'
          fill={getColor(color)}
          opacity={transparent ? 0.25 : 0}
        />
        <path
          d={`M${position.x},${position.y} m-${(d10Edge * 2) / 3},${
            d10Edge / 3
          } h-${d10Edge / 3} v-${(d10Edge * 2) / 3} l${d10Edge},-${
            (d10Edge * 2) / 3
          } z`}
          stroke='none'
          fill={transparent ? 'none' : lighten(getColor(color), 0.2)}
        />
        <path
          d={`M${position.x},${position.y} m${(d10Edge * 2) / 3},${
            d10Edge / 3
          } h${d10Edge / 3} v-${(d10Edge * 2) / 3} l-${d10Edge},-${
            (d10Edge * 2) / 3
          } z`}
          opacity={transparent ? 0.5 : 1}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.05)}
        />
        <path
          d={`M${position.x},${position.y} m-${(d10Edge * 2) / 3},${
            d10Edge / 3
          } h-${d10Edge / 3} l${d10Edge},${(d10Edge * 2) / 3} l${d10Edge},-${
            (d10Edge * 2) / 3
          } h-${d10Edge / 3} l-${(d10Edge * 2) / 3},${d10Edge / 3} z`}
          stroke='none'
          fill={transparent ? getColor(color) : darken(getColor(color), 0.1)}
        />

        <path
          d={`M${position.x},${position.y} m-${d10Edge},${d10Edge / 3} h${
            d10Edge / 3
          } l${(d10Edge * 2) / 3},-${(d10Edge * 4) / 3}`}
          stroke={transparent ? getColor(color) : undefined}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} m${d10Edge},${d10Edge / 3} h-${
            d10Edge / 3
          } l-${(d10Edge * 2) / 3},-${(d10Edge * 4) / 3}`}
          stroke={transparent ? getColor(color) : undefined}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} m0,${d10Edge} v-${d10Edge / 3} l-${
            (d10Edge * 2) / 3
          },-${d10Edge / 3}`}
          stroke={transparent ? getColor(color) : undefined}
          fill='none'
        />
        <path
          d={`M${position.x},${position.y} m0,${d10Edge} m0,-${d10Edge / 3} l${
            (d10Edge * 2) / 3
          },-${d10Edge / 3}`}
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
            y={position.y + 2}
          >
            {value}
          </text>
        )}
      </g>
    );

  if (sides === 12)
    return (
      <g
        opacity={(transparent ? 0.5 : 1) * (overloaded ? 0.5 : 1)}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        strokeLinejoin='round'
      >
        <path
          d={`${Array.from({
            length: 10,
          })
            .map(
              (_, i) =>
                `${i ? 'L' : 'M'}${
                  position.x + Math.cos((turn * (i + 0.5)) / 10) * d12Edge
                },${position.y + Math.sin((turn * (i + 0.5)) / 10) * d12Edge}`,
            )
            .join(' ')} z`}
          fill={transparent ? 'none' : getColor(color)}
          stroke={transparent ? getColor(color) : undefined}
          strokeWidth={3}
        />
        <path
          d={`${Array.from({ length: 5 })
            .map(
              (_, i) =>
                `${i ? 'L' : 'M'}${
                  position.x +
                  Math.cos((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                }`,
            )
            .join(' ')} z`}
          fill={transparent ? getColor(color) : 'none'}
          opacity={transparent ? 0.25 : 1}
        />
        <path
          d={`M${
            position.x + Math.cos((turn * 2.75) / 5) * ((d12Edge * 2) / 3)
          },${
            position.y + Math.sin((turn * 2.75) / 5) * ((d12Edge * 2) / 3)
          } L${position.x + Math.cos((turn * 2.75) / 5) * d12Edge},${
            position.y + Math.sin((turn * 2.75) / 5) * d12Edge
          } L${position.x + Math.cos((turn * 3.25) / 5) * d12Edge},${
            position.y + Math.sin((turn * 3.25) / 5) * d12Edge
          } L${position.x + Math.cos((turn * 3.75) / 5) * d12Edge},${
            position.y + Math.sin((turn * 3.75) / 5) * d12Edge
          } L${
            position.x + Math.cos((turn * 3.75) / 5) * ((d12Edge * 2) / 3)
          },${position.y + Math.sin((turn * 3.75) / 5) * ((d12Edge * 2) / 3)}`}
          fill={transparent ? 'none' : lighten(getColor(color), 0.2)}
        />
        <path
          d={`${Array.from({ length: 2 })
            .map(
              (_, i) =>
                `M${
                  position.x +
                  Math.cos((turn * (i + 1 - 0.25)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i + 1 - 0.25)) / 5) * ((d12Edge * 2) / 3)
                } L${
                  position.x + Math.cos((turn * (i + 1 - 0.25)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i + 1 - 0.25)) / 5) * d12Edge
                } L${
                  position.x + Math.cos((turn * (i + 1 + 0.25)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i + 1 + 0.25)) / 5) * d12Edge
                } L${
                  position.x + Math.cos((turn * (i + 1 + 0.75)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i + 1 + 0.75)) / 5) * d12Edge
                } L${
                  position.x +
                  Math.cos((turn * (i + 1 + 0.75)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i + 1 + 0.75)) / 5) * ((d12Edge * 2) / 3)
                }`,
            )
            .join(' ')}`}
          fill={transparent ? getColor(color) : darken(getColor(color), 0.1)}
        />
        <path
          d={`${Array.from({ length: 2 })
            .map(
              (_, i) =>
                `M${
                  position.x +
                  Math.cos((turn * (i - 1 - 0.25)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i - 1 - 0.25)) / 5) * ((d12Edge * 2) / 3)
                } L${
                  position.x + Math.cos((turn * (i - 1 - 0.25)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i - 1 - 0.25)) / 5) * d12Edge
                } L${
                  position.x + Math.cos((turn * (i - 1 + 0.25)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i - 1 + 0.25)) / 5) * d12Edge
                } L${
                  position.x + Math.cos((turn * (i - 1 + 0.75)) / 5) * d12Edge
                },${
                  position.y + Math.sin((turn * (i - 1 + 0.75)) / 5) * d12Edge
                } L${
                  position.x +
                  Math.cos((turn * (i - 1 + 0.75)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i - 1 + 0.75)) / 5) * ((d12Edge * 2) / 3)
                }`,
            )
            .join(' ')}`}
          fill={transparent ? getColor(color) : darken(getColor(color), 0.05)}
          opacity={transparent ? 0.5 : 1}
        />
        <path
          d={`${Array.from({ length: 5 })
            .map(
              (_, i) =>
                `${i ? 'L' : 'M'}${
                  position.x +
                  Math.cos((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                }`,
            )
            .join(' ')} z`}
          stroke={transparent ? getColor(color) : undefined}
          fill='none'
        />
        <path
          d={`${Array.from({ length: 5 })
            .map(
              (_, i) =>
                `M${
                  position.x +
                  Math.cos((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                },${
                  position.y +
                  Math.sin((turn * (i - 0.25)) / 5) * ((d12Edge * 2) / 3)
                } L${
                  position.x + Math.cos((turn * (i - 0.25)) / 5) * d12Edge
                },${position.y + Math.sin((turn * (i - 0.25)) / 5) * d12Edge}`,
            )
            .join(' ')}`}
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
            y={position.y + 2}
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

      {/* <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([0, 1])}
        sides={4}
        createdAt={new Date()}
        updatedAt={new Date()}
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([1, 1])}
        sides={4}
        createdAt={new Date()}
        updatedAt={new Date()}
        transparent
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([0, 2])}
        sides={6}
        createdAt={new Date()}
        updatedAt={new Date()}
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([1, 2])}
        sides={6}
        createdAt={new Date()}
        updatedAt={new Date()}
        transparent
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([0, 3])}
        sides={8}
        createdAt={new Date()}
        updatedAt={new Date()}
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([1, 3])}
        sides={8}
        createdAt={new Date()}
        updatedAt={new Date()}
        transparent
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([0, 4])}
        sides={10}
        createdAt={new Date()}
        updatedAt={new Date()}
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([1, 4])}
        sides={10}
        createdAt={new Date()}
        updatedAt={new Date()}
        transparent
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([0, 5])}
        sides={12}
        createdAt={new Date()}
        updatedAt={new Date()}
      />
      <Dice
        id='0'
        color={Color.GREEN}
        order={0}
        value={3}
        overloadCount={0}
        overloaded={false}
        ownerID='0'
        position={new Vector([1, 5])}
        sides={12}
        createdAt={new Date()}
        updatedAt={new Date()}
        transparent
      /> */}
    </>
  );
};
