import { IChangeMeUsecase, ISetCurrentGameUsecase } from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type UserUsecasesContextValue = {
  changeMe: IChangeMeUsecase['execute'];
  setCurrentGame: ISetCurrentGameUsecase['execute'];
};

export interface UserUsecasesContextProviderProps extends ContextProviderProps {
  changeMe: IChangeMeUsecase;
  setCurrentGame: ISetCurrentGameUsecase;
}
