import { ChangeMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type UserUsecasesContextValue = {
  changeMe: ChangeMeUsecase['execute'];
  setCurrentGame: SetCurrentGameUsecase['execute'];
};

export interface UserUsecasesContextProviderProps extends ContextProviderProps {
  changeMe: ChangeMeUsecase;
  setCurrentGame: SetCurrentGameUsecase;
}
