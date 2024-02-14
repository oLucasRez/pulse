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
} from '../pages';

import { makeGameLoader, makeHomeLoader, makeRegisterLoader } from './_loaders';
import {
  makeGamePath,
  makeHomePath,
  makeLoginPath,
  makeLogoutPath,
  makeRegisterPath,
} from './_paths';

export function makeRouter(): ReactElement {
  const loginPath = makeLoginPath();
  const loginPage = makeLoginPage();

  const registerPath = makeRegisterPath();
  const registerLoader = makeRegisterLoader();
  const registerPage = makeRegisterPage();

  const homePath = makeHomePath();
  const homeLoader = makeHomeLoader();
  const homePage = makeHomePage();

  const gamePath = makeGamePath();
  const gameLoader = makeGameLoader();
  const gamePage = makeGamePage();

  const logoutPath = makeLogoutPath();
  const logoutPage = makeLogoutPage();

  const notFoundPage = make404Page();

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path={loginPath} element={loginPage} />
        <Route
          path={registerPath}
          loader={registerLoader}
          element={registerPage}
        />

        <Route path={homePath} loader={homeLoader} element={homePage} />
        <Route path={gamePath} loader={gameLoader} element={gamePage} />

        <Route path={logoutPath} element={logoutPage} />

        <Route path='*' element={notFoundPage} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}
