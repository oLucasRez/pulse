import { LoaderFunctionArgs } from 'react-router-dom';

import { registerLoader } from '@presentation/pages/_register';

import { makeGetMeUsecase } from '@main/factories';

import { Loader } from '..';

export function makeRegisterLoader(): Loader {
  const getMe = makeGetMeUsecase();

  return (args: LoaderFunctionArgs) => registerLoader({ getMe, ...args });
}
