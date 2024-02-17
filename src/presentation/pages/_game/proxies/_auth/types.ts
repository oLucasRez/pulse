import { ReactElement } from 'react';

import { UserModel } from '@domain/models';

export interface AuthProxyProps {
  children: ReactElement;
}

export type MeContextValue = {
  me: UserModel;
};
