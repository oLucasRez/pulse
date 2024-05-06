import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

const SubjectPage = lazy(
  () => import('@presentation/pages/_game/pages/_subject'),
);

export function makeSubjectPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <SubjectPage />
    </Suspense>
  );
}
