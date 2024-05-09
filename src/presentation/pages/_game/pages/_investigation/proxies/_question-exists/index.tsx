import { cloneElement, FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Navigate } from '@presentation/components';
import { useQuestion } from '@presentation/hooks';

import {
  QuestionExistsProxyChildrenProps,
  QuestionExistsProxyProps,
} from './types';

export const QuestionExistsProxy: FC<QuestionExistsProxyProps> = ({
  children,
}) => {
  const params = useParams();

  const { questions } = useQuestion();

  const question = useMemo(
    () => questions.find(({ id }) => id === params.questionID) ?? null,
    [questions, params.questionID],
  );

  if (params.questionID && !question) return <Navigate.toGame replace />;

  return cloneElement(children, { question });
};

export namespace QuestionExistsProxy {
  export type ChildrenProps = QuestionExistsProxyChildrenProps;
}
