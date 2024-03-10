import { LoaderFunctionArgs } from 'react-router-dom';

import { UserModel } from '@domain/models';
import { GetMeUsecase } from '@domain/usecases';

export interface HomeLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
}

export type HomeLoaderData = UserModel;
