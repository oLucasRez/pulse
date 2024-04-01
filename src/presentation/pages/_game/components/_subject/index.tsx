import { FC } from 'react';

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
      <circle cx={position.x} cy={position.y} r={3} fill={getColor(color)}>
        {icon}
      </circle>
      <text
        className='handwriting'
        alignmentBaseline='middle'
        fill='white'
        stroke='white'
        strokeWidth={4}
        x={position.x + 7}
        y={position.y}
      >
        {description}
      </text>
      <text
        className='handwriting'
        alignmentBaseline='middle'
        fill={getColor(color)}
        x={position.x + 7}
        y={position.y}
      >
        {description}
      </text>
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
