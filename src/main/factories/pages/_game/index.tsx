import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import {
  AuthProxy,
  CreatePlayerProxy,
  GameExistsProxy,
} from '@presentation/pages/_game/proxies';

import {
  makeAnswerUsecasesContextProvider,
  makeCentralFactUsecasesContextProvider,
  makeCentralPulseUsecasesContextProvider,
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
  makeQuestionUsecasesContextProvider,
  makeRoundUsecasesContextProvider,
  makeSubjectPulseUsecasesContextProvider,
  makeSubjectUsecasesContextProvider,
  makeUserUsecasesContextProvider,
} from '@main/factories';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  const page = [
    // inner
    makeAnswerUsecasesContextProvider,
    makeQuestionUsecasesContextProvider,
    makeSubjectPulseUsecasesContextProvider,
    makeCentralFactUsecasesContextProvider,
    makeCentralPulseUsecasesContextProvider,
    makeSubjectUsecasesContextProvider,
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
