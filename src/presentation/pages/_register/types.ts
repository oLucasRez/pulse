import { LoaderFunctionArgs } from 'react-router-dom';

import { GetMeUsecase } from '@domain/usecases';

export interface RegisterLoaderArgs extends LoaderFunctionArgs {
  getMe: GetMeUsecase;
}

export type SignUpFieldValues = {
  name: string;
  email: string;
  password: string;
};
