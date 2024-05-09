import { ReactElement } from 'react';

import { QuestionModel } from '@domain/models';

export interface QuestionExistsProxyProps {
  children: ReactElement<QuestionExistsProxyChildrenProps>;
}

export interface QuestionExistsProxyChildrenProps {
  question?: QuestionModel | null;
}
