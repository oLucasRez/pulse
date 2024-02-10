import { lazy, ReactElement } from 'react';

const HomePage = lazy(() => import('@presentation/pages/_home'));

export function makeHomePage(): ReactElement {
  return <HomePage />;
}
