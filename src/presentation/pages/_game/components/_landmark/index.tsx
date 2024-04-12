import { FC } from 'react';

import { Vector } from '@domain/utils';

import { P, Text, Transition } from '@presentation/components';
import { useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { beginPath } from '@presentation/utils';

import { LandmarkProps } from './types';

import { useMapContext } from '..';

const descriptionOffset = new Vector([-50, -50]);

export const Landmark: FC<LandmarkProps> = ({
  description,
  symbol,
  onClick,
  ...props
}) => {
  const [s, set] = useStates({
    active: false,
  });

  const { mapSpace } = useMapContext();

  if (!props.position) return null;

  const position = mapSpace.mult(props.position);
  const descriptionPosition = position.sum(descriptionOffset);

  const color = props.color ? getColor(props.color) : '#757575';

  return (
    <>
      <Transition.Fade active={s.active} ms={200}>
        <g>
          <path
            // style
            fill='none'
            stroke={color}
            strokeWidth={2}
            strokeLinecap='round'
            // params
            d={beginPath()
              .moveTo(position)
              .bezierCurveTo(
                descriptionOffset.projX().mult(0.5),
                descriptionOffset.mult(new Vector([1, 0.5])),
                descriptionOffset,
              )
              .toString()}
          />
          <circle
            // style
            fill={color}
            // params
            cx={descriptionPosition.x}
            cy={descriptionPosition.y}
            r={3}
          />
          <P
            // style
            className='handwriting'
            strokeWidth={3}
            stroke='white'
            style={{
              position: 'absolute',
              left: descriptionPosition.x,
              top: descriptionPosition.y,
              color,
              maxWidth: '17.5ch',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              transform: 'translateY(-100%)',
            }}
          >
            {description}
          </P>
        </g>
      </Transition.Fade>

      <Transition.Scale active={s.active} activeFactor={1.3} ms={100}>
        <Text
          // style
          className='handwriting'
          textAnchor='middle'
          alignmentBaseline='middle'
          cursor='pointer'
          fill={color}
          stroke='white'
          strokeWidth={3}
          // params
          x={position.x}
          y={position.y}
          // handle
          onMouseEnter={set('active', true)}
          onMouseOut={set('active', false)}
          onClick={onClick}
        >
          {symbol}
        </Text>
      </Transition.Scale>
    </>
  );
};
