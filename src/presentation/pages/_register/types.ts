import { LoaderFunctionArgs } from 'react-router-dom';

import { IGetMeUsecase } from '@domain/usecases';

export interface RegisterLoaderArgs extends LoaderFunctionArgs {
  getMe: IGetMeUsecase;
}
