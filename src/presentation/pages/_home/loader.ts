import { redirect } from 'react-router-dom';

import { HomeLoaderArgs } from './types';

export async function homeLoader(args: HomeLoaderArgs): Promise<null> {
  const { getMe } = args;

  try {
    await getMe.execute();
  } catch {
    throw redirect('/login');
  }

  return null;
}
