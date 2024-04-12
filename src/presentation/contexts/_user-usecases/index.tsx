import { createContext, FC, useCallback, useContext } from 'react';

import { IChangeMeUsecase, ISetCurrentGameUsecase } from '@domain/usecases';

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

  const changeMe = useCallback<IChangeMeUsecase['execute']>(
    async (payload: IChangeMeUsecase.Payload) =>
      props.changeMe.execute(payload),
    [],
  );

  const setCurrentGame = useCallback<ISetCurrentGameUsecase['execute']>(
    (gameID: string | null) => props.setCurrentGame.execute(gameID),
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
