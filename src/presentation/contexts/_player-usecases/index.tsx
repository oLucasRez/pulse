import { createContext, FC, useCallback, useContext } from 'react';

import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  GetMyPlayerUsecase,
} from '@domain/usecases';

import {
  PlayerUsecasesContextProviderProps,
  PlayerUsecasesContextValue,
} from './types';

const Context = createContext({} as PlayerUsecasesContextValue);

export const usePlayerUsecases = (): PlayerUsecasesContextValue =>
  useContext(Context);

export const PlayerUsecasesContextProvider: FC<
  PlayerUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const fetchMyPlayer = useCallback<GetMyPlayerUsecase['execute']>(
    () => props.getMyPlayer.execute(),
    [],
  );

  const createPlayer = useCallback<CreatePlayerUsecase['execute']>(
    (payload: CreatePlayerUsecase.Payload) =>
      props.createPlayer.execute(payload),
    [],
  );

  const changePlayer = useCallback<ChangePlayerUsecase['execute']>(
    (payload: ChangePlayerUsecase.Payload) =>
      props.changePlayer.execute(payload),
    [],
  );

  const banPlayer = useCallback<BanPlayerUsecase['execute']>(
    (id: string) => props.banPlayer.execute(id),
    [],
  );

  return (
    <Context.Provider
      value={{
        fetchMyPlayer,
        createPlayer,
        changePlayer,
        banPlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
