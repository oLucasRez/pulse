import { IUserHydrator } from '@data/hydration';

import { UserHydrator } from '@main/hydration';

export function makeUserHydrator(): IUserHydrator {
  return new UserHydrator();
}
