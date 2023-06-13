import { v4 } from 'uuid';

import { ID } from '@types';

export function uuid(): ID {
  return v4();
}
