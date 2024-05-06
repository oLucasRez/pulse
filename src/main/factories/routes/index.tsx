import { ReactElement } from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  make404Page,
  makeCentralFactPage,
  makeGamePage,
  makeHomePage,
  makeLoginPage,
  makeLogoutPage,
  makeRegisterPage,
  makeRootPage,
  makeSubjectPage,
} from '../pages';

import {
  makeCentralFactPath,
  makeGamePath,
  makeLoginPath,
  makeLogoutPath,
  makeRegisterPath,
  makeRootPath,
  makeSubjectPaths,
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

  const subjectPaths = makeSubjectPaths();
  const subjectPage = makeSubjectPage();

  const centralFactPath = makeCentralFactPath();
  const centralFactPage = makeCentralFactPage();

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

          <Route path={gamePath} element={gamePage}>
            {subjectPaths.map((path) => (
              <Route key={path} path={path} element={subjectPage} />
            ))}
            <Route path={centralFactPath} element={centralFactPage} />
          </Route>
        </Route>

        <Route path={logoutPath} element={logoutPage} />

        <Route path='*' element={notFoundPage} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}
