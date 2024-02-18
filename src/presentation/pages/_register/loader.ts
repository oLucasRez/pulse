import { redirect } from 'react-router-dom';

import { UserModel } from '@domain/models';

import { RegisterLoaderArgs } from './types';

export async function registerLoader(args: RegisterLoaderArgs): Promise<null> {
  const { getMe } = args;

  let me: UserModel | null = null;
  try {
    me = await getMe.execute();
  } catch {
    return null;
  }

  if (me) throw redirect('/');

  return null;
}
