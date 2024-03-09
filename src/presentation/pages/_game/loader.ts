import { redirect } from 'react-router-dom';

import { DomainError } from '@domain/errors';

import { alertError } from '@presentation/utils';

import { GameLoaderArgs } from './types';

export async function gameLoader(args: GameLoaderArgs): Promise<null> {
  const { getGame, params } = args;

  try {
    if (!params.id) throw 'error';

    await getGame.execute(params.id);

    return null;
  } catch (e) {
    alertError(e as DomainError);
    throw redirect('/login');
  }
}
