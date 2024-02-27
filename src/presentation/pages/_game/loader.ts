import {
  redirect,
  useLoaderData as useDefaultLoaderData,
} from 'react-router-dom';

import { DomainError, NotFoundError } from '@domain/errors';

import { GameLoaderArgs, GameLoaderData } from './types';

import { alertError } from '@presentation/utils';

export async function gameLoader(
  args: GameLoaderArgs,
): Promise<GameLoaderData> {
  const { getGame, params } = args;

  try {
    if (!params.id) throw 'error';

    const currentGame = await getGame.execute(params.id);

    if (!currentGame)
      throw new NotFoundError({
        metadata: { entity: 'Game', prop: 'id', value: params.id },
      });

    return currentGame;
  } catch (e) {
    alertError(e as DomainError);
    throw redirect('/login');
  }
}

export const useGameLoaderData = (): GameLoaderData =>
  useDefaultLoaderData() as any;
