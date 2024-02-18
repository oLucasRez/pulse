import { redirect } from 'react-router-dom';

import { UserModel } from '@domain/models';

import { LoginLoaderArgs } from './types';

export async function loginLoader(args: LoginLoaderArgs): Promise<null> {
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
