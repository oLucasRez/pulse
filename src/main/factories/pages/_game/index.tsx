import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import {
  AuthProxy,
  CreatePlayerProxy,
  GameExistsProxy,
} from '@presentation/pages/_game/proxies';

import {
  makeCentralFactUsecasesContextProvider,
  makeCentralPulseUsecasesContextProvider,
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
  makeRoundUsecasesContextProvider,
  makeUserUsecasesContextProvider,
} from '@main/factories';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  const page = [
    // inner
    makeCentralFactUsecasesContextProvider,
    makeCentralPulseUsecasesContextProvider,
    makeRoundUsecasesContextProvider,
    makePlayerUsecasesContextProvider,
    makeDiceUsecasesContextProvider,
    makeGameUsecasesContextProvider,
    makeUserUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <GameExistsProxy>
        <AuthProxy>
          <CreatePlayerProxy>
            <GamePage />
          </CreatePlayerProxy>
        </AuthProxy>
      </GameExistsProxy>
    </Suspense>,
  );

  return page;
}
