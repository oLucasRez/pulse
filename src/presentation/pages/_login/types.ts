import { LoaderFunctionArgs } from 'react-router-dom';

import { IGetMeUsecase } from '@domain/usecases';

export interface LoginLoaderArgs extends LoaderFunctionArgs {
  getMe: IGetMeUsecase;
}
