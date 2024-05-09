import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import {
  CreatingInCorrectStateProxy,
  QuestionExistsProxy,
} from '@presentation/pages/_game/pages/_investigation/proxies';

const InvestigationPage = lazy(
  () => import('@presentation/pages/_game/pages/_investigation'),
);

export function makeInvestigationPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <CreatingInCorrectStateProxy>
        <QuestionExistsProxy>
          <InvestigationPage />
        </QuestionExistsProxy>
      </CreatingInCorrectStateProxy>
    </Suspense>
  );
}
