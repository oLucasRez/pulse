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
} from '../pages';

import { makeGameLoader, makeHomeLoader } from './_loaders';
import {
  makeGamePath,
  makeHomePath,
  makeLoginPath,
  makeLogoutPath,
} from './_paths';

export function makeRouter(): ReactElement {
  const homePath = makeHomePath();
  const homeLoader = makeHomeLoader();
  const homePage = makeHomePage();

  const loginPath = makeLoginPath();
  const loginPage = makeLoginPage();

  const gamePath = makeGamePath();
  const gameLoader = makeGameLoader();
  const gamePage = makeGamePage();

  const logoutPath = makeLogoutPath();
  const logoutPage = makeLogoutPage();

  const notFoundPage = make404Page();

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path={homePath} loader={homeLoader} element={homePage} />
        <Route path={loginPath} element={loginPage} />
        <Route path={gamePath} loader={gameLoader} element={gamePage} />
        <Route path={logoutPath} element={logoutPage} />

        <Route path='*' element={notFoundPage} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}
