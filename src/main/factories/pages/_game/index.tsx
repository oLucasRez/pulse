import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import {
  AuthProxy,
  CreatePlayerProxy,
  GameExistsProxy,
} from '@presentation/pages/_game/proxies';

import {
  makeAnswerContextProvider,
  makeCentralFactContextProvider,
  makeCentralPulseContextProvider,
  makeDiceContextProvider,
  makeGameContextProvider,
  makeLightSpotContextProvider,
  makePlayerContextProvider,
  makeQuestionContextProvider,
  makeRoundContextProvider,
  makeSubjectContextProvider,
  makeSubjectPulseContextProvider,
} from '@main/factories';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  const page = [
    // inner
    makeLightSpotContextProvider,
    makeAnswerContextProvider,
    makeQuestionContextProvider,
    makeSubjectPulseContextProvider,
    makeCentralFactContextProvider,
    makeCentralPulseContextProvider,
    makeSubjectContextProvider,
    makeDiceContextProvider,
    makePlayerContextProvider,
    makeRoundContextProvider,
    makeGameContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <GameExistsProxy>
        <CreatePlayerProxy>
          <GamePage />
        </CreatePlayerProxy>
      </GameExistsProxy>
    </Suspense>,
  );

  return <AuthProxy>{page}</AuthProxy>;
}

export * from './_central-fact';
export * from './_subject';
