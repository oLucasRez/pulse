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
  makePlayerContextProvider,
  makeQuestionContextProvider,
  makeRoundContextProvider,
  makeSubjectContextProvider,
  makeSubjectPulseContextProvider,
  makeUserContextProvider,
} from '@main/factories';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  const page = [
    // inner
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
    makeUserContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <AuthProxy>
        <GameExistsProxy>
          <CreatePlayerProxy>
            <GamePage />
          </CreatePlayerProxy>
        </GameExistsProxy>
      </AuthProxy>
    </Suspense>,
  );

  return page;
}
