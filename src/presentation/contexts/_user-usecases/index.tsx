import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { UserModel } from '@domain/models';

import { ChangeMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import {
  UserUsecasesContextProviderProps,
  UserUsecasesContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import { useAuthUsecases } from '..';

const Context = createContext({} as UserUsecasesContextValue);

export const useUserUsecases = (): UserUsecasesContextValue =>
  useContext(Context);

export const UserUsecasesContextProvider: FC<
  UserUsecasesContextProviderProps
> = (props) => {
  const { getMe, children } = props;

  const [s, set] = useStates({
    me: null as UserModel | null,
    fetchingMe: true,
  });

  const { meVersion } = useAuthUsecases();

  useEffect(() => {
    set('fetchingMe')(true);

    getMe
      .execute()
      .then(set('me'))
      .catch(logError)
      .finally(set('fetchingMe', false));
  }, [meVersion]);

  const changeMe = useCallback<ChangeMeUsecase['execute']>(
    async (payload: ChangeMeUsecase.Payload) => {
      set('fetchingMe')(true);

      const me = await props.changeMe
        .execute(payload)
        .finally(set('fetchingMe', false));

      set('me')(me);

      return me;
    },
    [props.changeMe, set],
  );

  const setCurrentGame = useCallback<SetCurrentGameUsecase['execute']>(
    async (gameID: string) => {
      set('fetchingMe')(true);

      const me = await props.setCurrentGame
        .execute(gameID)
        .finally(set('fetchingMe', false));

      set('me')(me);

      return me;
    },
    [props.setCurrentGame, set],
  );

  return (
    <Context.Provider
      value={{
        changeMe,
        setCurrentGame,

        me: s.me,
        fetchingMe: s.fetchingMe,
      }}
    >
      {children}
    </Context.Provider>
  );
};
