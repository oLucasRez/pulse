import { createContext, FC, useCallback, useContext } from 'react';

import { ChangeMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import {
  UserUsecasesContextProviderProps,
  UserUsecasesContextValue,
} from './types';

const Context = createContext({} as UserUsecasesContextValue);

export const useUserUsecases = (): UserUsecasesContextValue =>
  useContext(Context);

export const UserUsecasesContextProvider: FC<
  UserUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const changeMe = useCallback<ChangeMeUsecase['execute']>(
    async (payload: ChangeMeUsecase.Payload) => props.changeMe.execute(payload),
    [],
  );

  const setCurrentGame = useCallback<SetCurrentGameUsecase['execute']>(
    (gameID: string) => props.setCurrentGame.execute(gameID),
    [],
  );

  return (
    <Context.Provider
      value={{
        changeMe,
        setCurrentGame,
      }}
    >
      {children}
    </Context.Provider>
  );
};
