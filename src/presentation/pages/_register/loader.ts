import { redirect } from 'react-router-dom';

import { RegisterLoaderArgs } from './types';

import { logError } from '@presentation/utils';

export async function registerLoader(args: RegisterLoaderArgs): Promise<null> {
  const { getMe } = args;

  const me = await getMe.execute().catch(logError);

  if (me) throw redirect('/');

  return null;
}
