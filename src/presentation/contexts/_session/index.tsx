import { createContext, FC, useContext, useEffect } from 'react';

import { UserModel } from '@domain/models';

import { useAuthUsecases } from '../_auth-usecases';

import { SessionContextProviderProps, SessionContextValue } from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

const Context = createContext({ me: null } as SessionContextValue);

export const useSession = (): SessionContextValue => useContext(Context);

export const SessionContextProvider: FC<SessionContextProviderProps> = (
  props,
) => {
  const { children } = props;

  const s = useStates({
    me: null as UserModel | null,
  });

  const { watchMe } = useAuthUsecases();
  useEffect(() => {
    watchMe.execute((me) => (s.me = me)).catch(logError);
  }, [watchMe]);

  return <Context.Provider value={{ me: s.me }}>{children}</Context.Provider>;
};
