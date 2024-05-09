import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import {
  CreatingInCorrectStateProxy,
  SubjectExistsProxy,
} from '@presentation/pages/_game/pages/_subject/proxies';

const SubjectPage = lazy(
  () => import('@presentation/pages/_game/pages/_subject'),
);

export function makeSubjectPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <CreatingInCorrectStateProxy>
        <SubjectExistsProxy>
          <SubjectPage />
        </SubjectExistsProxy>
      </CreatingInCorrectStateProxy>
    </Suspense>
  );
}
