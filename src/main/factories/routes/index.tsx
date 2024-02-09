import { ReactElement } from 'react';
import {
  createBrowserRouter,
  createRoutesFromChildren,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { UserModel } from '@domain/models';

import { DomainError } from '@domain/errors';

import { alertError, logError } from '@presentation/utils';

import { makeGetMeUsecase } from '..';

export function makeRouter(): ReactElement {
  const getMe = makeGetMeUsecase();

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route
          path='/'
          loader={async (): Promise<UserModel> => {
            const me = await getMe.execute().catch(logError);

            if (!me) throw redirect('/login');

            return me;
          }}
          lazy={(): any => import('@presentation/pages/_home')}
        />
        <Route
          path='/login'
          lazy={(): any => import('@presentation/pages/_login')}
        />
        <Route
          path='/game/:id'
          loader={async (): Promise<UserModel | null> => {
            try {
              const me = await getMe.execute();

              return me;
            } catch (e) {
              alertError(e as DomainError);
              throw redirect('/login');
            }
          }}
          lazy={(): any => import('@presentation/pages/_game')}
        />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}
