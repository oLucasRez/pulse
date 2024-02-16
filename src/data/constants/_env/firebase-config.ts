import { DomainError, RequiredError } from '@domain/errors';

import { FirebaseOptions } from 'firebase/app';

import { logError } from '@presentation/utils';

const requiredError = new RequiredError({
  metadata: { entity: 'Firebase config env' },
});

if (!process.env.FIREBASE_CONFIG) throw requiredError;

let FIREBASE_CONFIG: FirebaseOptions = {};
try {
  FIREBASE_CONFIG = JSON.parse(process.env.FIREBASE_CONFIG || '{}');
} catch (e) {
  const error = e as DomainError;
  logError(error);

  throw requiredError;
}

export { FIREBASE_CONFIG };
