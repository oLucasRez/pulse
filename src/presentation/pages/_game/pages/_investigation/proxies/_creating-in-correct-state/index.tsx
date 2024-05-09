import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Navigate } from '@presentation/components';
import { useGame } from '@presentation/hooks';

import { CreatingInCorrectStateProxyProps } from './types';

export const CreatingInCorrectStateProxy: FC<
  CreatingInCorrectStateProxyProps
> = ({ children }) => {
  const params = useParams();
  const isCreating = !params.questionID;

  const { currentGame } = useGame();

  const [state, subState] = currentGame?.state ?? [];

  const inCorrectState =
    state === 'creating:questions' && subState === 'create:question';

  if (isCreating && !inCorrectState) return <Navigate.toGame replace />;

  return children;
};
