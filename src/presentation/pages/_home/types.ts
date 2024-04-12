import { LoaderFunctionArgs } from 'react-router-dom';

import { UserModel } from '@domain/models';
import { IGetMeUsecase } from '@domain/usecases';

export interface HomeLoaderArgs extends LoaderFunctionArgs {
  getMe: IGetMeUsecase;
}

export type HomeLoaderData = UserModel;
