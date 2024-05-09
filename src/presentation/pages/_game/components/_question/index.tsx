import { FC } from 'react';

import { QuestionModel } from '@domain/models';

import { useNavigate, useQuestion } from '@presentation/hooks';

import { Landmark } from '..';

export const Question: FC<QuestionModel> = (props) => {
  const { navigateToInvestigation } = useNavigate();

  return (
    <Landmark
      {...props}
      symbol='?'
      onClick={() => navigateToInvestigation(props.id)}
    />
  );
};

export const Questions: FC = () => {
  const { questions } = useQuestion();

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </>
  );
};
