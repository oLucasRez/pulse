import {
  redirect,
  useLoaderData as useDefaultLoaderData,
} from 'react-router-dom';

import { UserModel } from '@domain/models';

import { HomeLoaderArgs, HomeLoaderData } from './types';

export async function homeLoader(args: HomeLoaderArgs): Promise<UserModel> {
  const { getMe } = args;

  try {
    const me = await getMe.execute();

    if (!me) throw redirect('/login');

    return me;
  } catch {
    throw redirect('/login');
  }
}

export const useHomeLoaderData = (): HomeLoaderData =>
  useDefaultLoaderData() as any;
