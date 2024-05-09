import { FC } from 'react';

import { useCentralFact, useNavigate } from '@presentation/hooks';

import { Landmark } from '..';

export const CentralFact: FC = () => {
  const { centralFact } = useCentralFact();

  const { navigateToCentralFact } = useNavigate();

  if (!centralFact) return null;

  return (
    <Landmark {...centralFact} symbol='#' onClick={navigateToCentralFact} />
  );
};
