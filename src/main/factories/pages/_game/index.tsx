import { CreatePlayerProxy } from '@presentation/pages/_game';
import { lazy, ReactElement } from 'react';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  return (
    <CreatePlayerProxy>
      <GamePage />
    </CreatePlayerProxy>
  );
}
