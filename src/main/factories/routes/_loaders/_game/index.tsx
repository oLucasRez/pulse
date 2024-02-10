import { LoaderFunctionArgs } from 'react-router-dom';

import { gameLoader } from '@presentation/pages/_game';

import { makeGetGameUsecase, makeGetMeUsecase } from '@main/factories';

import { Loader } from '..';

export function makeGameLoader(): Loader {
  const getMe = makeGetMeUsecase();
  const getGame = makeGetGameUsecase();

  return (args: LoaderFunctionArgs) => gameLoader({ getMe, getGame, ...args });
}
