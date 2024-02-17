import { LoaderFunctionArgs } from 'react-router-dom';

import { gameLoader } from '@presentation/pages/_game';

import { makeGetGameUsecase } from '@main/factories';

import { Loader } from '..';

export function makeGameLoader(): Loader {
  const getGame = makeGetGameUsecase();

  return (args: LoaderFunctionArgs) => gameLoader({ getGame, ...args });
}
