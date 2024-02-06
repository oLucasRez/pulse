import { ChangeUserUsecase, GetMeUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  getMe: GetMeUsecase;
  changeUser: ChangeUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  getMe: GetMeUsecase;
  changeUser: ChangeUserUsecase;
}
