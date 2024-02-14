import { redirect } from 'react-router-dom';

import { LoginLoaderArgs } from './types';

import { logError } from '@presentation/utils';

export async function loginLoader(args: LoginLoaderArgs): Promise<null> {
  const { getMe } = args;

  const me = await getMe.execute().catch(logError);

  if (me) throw redirect('/');

  return null;
}
