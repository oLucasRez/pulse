import { FC, useMemo } from 'react';

import { Color } from '@domain/enums';
import { QuestionModel } from '@domain/models';

import { useAnswer, useNavigate, useQuestion } from '@presentation/hooks';

import { Landmark } from '..';

export const Question: FC<QuestionModel> = (props) => {
  const { navigateToInvestigation } = useNavigate();
  const { answers } = useAnswer();

  const solved = !!props.factID;

  const [subtitle, subtitleItalic, subtitleColor] = useMemo((): [
    string?,
    boolean?,
    Color?,
  ] => {
    const questionAnswers = answers.filter(
      ({ questionID }) => questionID === props.id,
    );

    const fact = questionAnswers.find(({ id }) => id === props.factID);

    if (fact) return [fact.description, false, fact.color];

    const n = questionAnswers.length;

    if (!n) return [];

    return [n === 1 ? '1 resposta' : `${n} respostas`, true];
  }, [answers, props.id, props.factID]);

  return (
    <Landmark
      {...props}
      symbol={solved ? '!' : '?'}
      subtitle={subtitle}
      subtitleItalic={subtitleItalic}
      subtitleColor={subtitleColor}
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
