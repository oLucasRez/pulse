import { lazy, ReactElement } from 'react';

import { CreatePlayerProxy } from '@presentation/pages/_game';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  return (
    <CreatePlayerProxy>
      <GamePage />
    </CreatePlayerProxy>
  );
}
