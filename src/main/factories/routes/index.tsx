import { ReactElement } from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  make404Page,
  makeGamePage,
  makeHomePage,
  makeLoginPage,
  makeLogoutPage,
  makeRegisterPage,
  makeRootPage,
} from '../pages';

import {
  makeGamePath,
  makeLoginPath,
  makeLogoutPath,
  makeRegisterPath,
  makeRootPath,
} from './_paths';

export function makeRouter(): ReactElement {
  const loginPath = makeLoginPath();
  const loginPage = makeLoginPage();

  const registerPath = makeRegisterPath();
  const registerPage = makeRegisterPage();

  const rootPath = makeRootPath();
  const rootPage = makeRootPage();

  const homePage = makeHomePage();

  const gamePath = makeGamePath();
  const gamePage = makeGamePage();

  const logoutPath = makeLogoutPath();
  const logoutPage = makeLogoutPage();

  const notFoundPage = make404Page();

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path={rootPath} element={rootPage}>
          <Route path={loginPath} element={loginPage} />
          <Route path={registerPath} element={registerPage} />

          <Route index element={homePage} />

          <Route path={gamePath} element={gamePage} />
        </Route>

        <Route path={logoutPath} element={logoutPage} />

        <Route path='*' element={notFoundPage} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}
