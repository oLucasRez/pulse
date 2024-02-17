import { LoaderFunctionArgs } from 'react-router-dom';

import { GetMeUsecase } from '@domain/usecases';

export interface LoginLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
}
