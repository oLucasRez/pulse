import { Signal } from '@preact/signals-react';

import { UserModel } from '@domain/models';

export type AuthSignals = {
  me: Signal<UserModel | null>;
  initialized: Signal<boolean>;
};
