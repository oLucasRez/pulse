import { UserModel } from '@domain/models';

import { ContextProviderProps } from '@presentation/types';

export type SessionContextValue = {
  me: UserModel | null;
};

export interface SessionContextProviderProps extends ContextProviderProps {}
