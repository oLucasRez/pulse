import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

import { env } from '@data/constants';

import { initializeApp } from 'firebase/app';

const app = initializeApp(env.FIREBASE_CONFIG);

export namespace FirebaseService {
  export const firestoreDB = getFirestore(app);
  export const auth = getAuth(app);
  export const realtimeDB = getDatabase(app);
}
