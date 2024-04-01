import { FC, useMemo } from 'react';

import { usePlayerUsecases, useQuestionUsecases } from '@presentation/contexts';
import { getColor } from '@presentation/styles/mixins';

import { QuestionProps } from './types';

import { useMapContext } from '..';

export const Question: FC<QuestionProps> = (props) => {
  const { authorID } = props;

  const { mapSpace } = useMapContext();
  const { players } = usePlayerUsecases();

  const color = useMemo(
    () =>
      (authorID && players.find((value) => value.id === authorID)?.color) ||
      null,
    [authorID, players],
  );

  if (!color) return null;

  const position = mapSpace.mult(props.position);

  return (
    <>
      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        fill='white'
        stroke='white'
        strokeWidth={4}
        x={position.x}
        y={position.y}
      >
        ?
      </text>
      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        fill={getColor(color)}
        x={position.x}
        y={position.y}
      >
        ?
      </text>
    </>
  );
};

export const Questions: FC = () => {
  const { questions } = useQuestionUsecases();

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </>
  );
};
