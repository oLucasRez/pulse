import { env } from '@data/constants';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const app = initializeApp(env.FIREBASE_CONFIG);

export namespace FirebaseService {
  export const db = getFirestore(app);
  export const auth = getAuth(app);
}
