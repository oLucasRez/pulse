import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import { PlayerExistsProxy } from '@presentation/pages/_game/pages/_player/proxies';

const PlayerPage = lazy(
  () => import('@presentation/pages/_game/pages/_player'),
);

export function makePlayerPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <PlayerExistsProxy>
        <PlayerPage />
      </PlayerExistsProxy>
    </Suspense>
  );
}
