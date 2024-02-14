import { LoaderFunctionArgs } from 'react-router-dom';

import { loginLoader } from '@presentation/pages/_login';

import { makeGetMeUsecase } from '@main/factories';

import { Loader } from '..';

export function makeLoginLoader(): Loader {
  const getMe = makeGetMeUsecase();

  return (args: LoaderFunctionArgs) => loginLoader({ getMe, ...args });
}
