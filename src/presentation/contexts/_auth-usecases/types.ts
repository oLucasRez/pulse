import { GetCurrentUserUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type AuthUsecasesContextValue = {
  getCurrentUser: GetCurrentUserUsecase;
};

export interface AuthUsecasesContextProviderProps extends ContextProviderProps {
  getCurrentUser: GetCurrentUserUsecase;
}
