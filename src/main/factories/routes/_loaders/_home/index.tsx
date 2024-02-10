import { LoaderFunctionArgs } from 'react-router-dom';

import { homeLoader } from '@presentation/pages/_home';

import { makeGetMeUsecase } from '@main/factories';

import { Loader } from '..';

export function makeHomeLoader(): Loader {
  const getMe = makeGetMeUsecase();

  return (args: LoaderFunctionArgs) => homeLoader({ getMe, ...args });
}