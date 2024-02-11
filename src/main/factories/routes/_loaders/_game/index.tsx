import { LoaderFunctionArgs } from 'react-router-dom';

import { gameLoader } from '@presentation/pages/_game';

import {
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeSetCurrentGameUsecase,
} from '@main/factories';

import { Loader } from '..';

export function makeGameLoader(): Loader {
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();

  return (args: LoaderFunctionArgs) =>
    gameLoader({ getGame, getMe, setCurrentGame, ...args });
}
