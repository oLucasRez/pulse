import { FC } from 'react';

import { Text } from '@presentation/components';
import { useSubjectUsecases } from '@presentation/contexts';
import { getColor } from '@presentation/styles/mixins';

import { SubjectProps } from './types';

import { useMapContext } from '..';

export const Subject: FC<SubjectProps> = (props) => {
  const { icon, description, color } = props;

  const { mapSpace } = useMapContext();

  const position = props.position && mapSpace.mult(props.position);

  if (!position) return null;

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
  const { subjects } = useSubjectUsecases();

  return (
    <>
      {subjects.map((subject) => (
        <Subject key={subject.id} {...subject} />
      ))}
    </>
  );
};
