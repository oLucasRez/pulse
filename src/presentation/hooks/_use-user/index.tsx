import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { DomainError } from '@domain/errors';
import { UserModel } from '@domain/models';

import { UserContextProviderProps, UserContextValue } from './types';

import { useUsecase } from '../_use-usecase';

const Context = createContext({} as UserContextValue);

export const useUser = (): UserContextValue => useContext(Context);

const queryKey = ['me'];

export const UserContextProvider: FC<UserContextProviderProps> = ({
  getMe,
  children,
  ...props
}) => {
  const {
    data: me = null,
    isLoading: fetchingMe,
    error,
  } = useQuery<UserModel | null, DomainError>({
    queryKey,
    queryFn: () => getMe.execute(),
  });

  const queryClient = useQueryClient();

  function replaceData(me: UserModel): void {
    queryClient.setQueryData<UserModel | null>(queryKey, () => me);
  }

  function clearData(): void {
    queryClient.setQueryData<UserModel | null>(queryKey, () => null);
  }

  const signUpWithCredentials = useUsecase(props.signUpWithCredentials, {
    onSuccess: (me) => replaceData(me),
  });

  const signInWithCredentials = useUsecase(props.signInWithCredentials, {
    onSuccess: (me) => replaceData(me),
  });

  const signInWithProvider = useUsecase(props.signInWithProvider, {
    onSuccess: (me) => replaceData(me),
  });

  const linkWithProvider = useUsecase(props.linkWithProvider, {
    onSuccess: (me) => replaceData(me),
  });

  const signInAnonymously = useUsecase(props.signInAnonymously, {
    onSuccess: (me) => replaceData(me),
  });

  const signOut = useUsecase(props.signOut, {
    onSuccess: () => clearData(),
  });

  const changeMe = useUsecase(props.changeMe, {
    onSuccess: (me) => replaceData(me),
  });

  const setCurrentGame = useUsecase(props.setCurrentGame, {
    onSuccess(me) {
      replaceData(me);
      queryClient.invalidateQueries({ queryKey: [me.uid, 'games'] });
    },
  });

  return (
    <Context.Provider
      value={{
        me,
        fetchingMe,
        error,
        signUpWithCredentials,
        signInWithCredentials,
        signInWithProvider,
        linkWithProvider,
        signInAnonymously,
        signOut,
        changeMe,
        setCurrentGame,
      }}
    >
      {children}
    </Context.Provider>
  );
};
