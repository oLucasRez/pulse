import { lazy, ReactElement } from 'react';

const LoginPage = lazy(() => import('@presentation/pages/_login'));

export function makeLoginPage(): ReactElement {
  return <LoginPage />;
}
