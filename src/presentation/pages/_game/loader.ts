import {
  redirect,
  useLoaderData as useDefaultLoaderData,
} from 'react-router-dom';

import { DomainError } from '@domain/errors';

import { GameLoaderArgs, GameLoaderData } from './types';

import { alertError } from '@presentation/utils';

export async function gameLoader(
  args: GameLoaderArgs,
): Promise<GameLoaderData> {
  const { getMe, getGame, setCurrentGame, params } = args;

  try {
    const me = await getMe.execute();

    if (!params.id) throw 'error';

    const currentGame = await getGame.execute(params.id);

    await setCurrentGame.execute(currentGame.id);

    return {
      me,
      currentGame,
    };
  } catch (e) {
    alertError(e as DomainError);
    throw redirect('/login');
  }
}

export const useGameLoaderData = (): GameLoaderData =>
  useDefaultLoaderData() as any;
