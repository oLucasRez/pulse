import { LoaderFunctionArgs } from 'react-router-dom';

import { GetMeUsecase } from '@domain/usecases';

export interface RegisterLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
}
