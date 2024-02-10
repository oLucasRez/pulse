import {
  redirect,
  useLoaderData as useDefaultLoaderData,
} from 'react-router-dom';

import { UserModel } from '@domain/models';

import { HomeLoaderArgs, HomeLoaderData } from './types';

import { logError } from '@presentation/utils';

export async function homeLoader(args: HomeLoaderArgs): Promise<UserModel> {
  const { getMe } = args;

  const me = await getMe.execute().catch(logError);

  if (!me) throw redirect('/login');

  return me;
}

export const useHomeLoaderData = (): HomeLoaderData =>
  useDefaultLoaderData() as any;
