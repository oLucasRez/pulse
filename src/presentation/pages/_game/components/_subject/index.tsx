import { FC } from 'react';

import { Vector } from '@domain/utils';

import { Text } from '@presentation/components';
import { usePlayer, useSubject } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { SubjectProps } from './types';

import { useMapContext } from '..';

export const Subject: FC<SubjectProps> = (props) => {
  const { icon, description, color, authorID } = props;

  const { players } = usePlayer();

  const { mapSpace } = useMapContext();

  const author = players.find(({ id }) => id === authorID) ?? null;

  const position = mapSpace.mult(
    props.position ?? new Vector([-18, -18 + (author?.order ?? 0) * 1.5]),
  );

  return (
    <>
      <circle
        // style
        fill={getColor(color)}
        // params
        cx={position.x}
        cy={position.y}
        r={3}
      >
        {icon}
      </circle>
      <Text
        // style
        className='handwriting'
        alignmentBaseline='middle'
        fill={getColor(color)}
        stroke='white'
        strokeWidth={3}
        // params
        x={position.x + 7}
        y={position.y}
      >
        {description}
      </Text>
    </>
  );
};

export const Subjects: FC = () => {
  const { subjects } = useSubject();

  return (
    <>
      {subjects.map((subject) => (
        <Subject key={subject.id} {...subject} />
      ))}
    </>
  );
};
