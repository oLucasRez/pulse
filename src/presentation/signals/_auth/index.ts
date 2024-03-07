import { signal } from '@preact/signals-react';

import { UserModel } from '@domain/models';

import { AuthSignals } from './types';

const me = signal<UserModel | null>(null);
const initialized = signal(false);

export const authSignals: AuthSignals = {
  me,
  initialized,
};

export { AuthSignals } from './types';
