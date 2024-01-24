import { getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD-zJmwcWtD6TxnOszNvWH8fRtfVJHbhfg',
  authDomain: 'pulse-45215.firebaseapp.com',
  projectId: 'pulse-45215',
  storageBucket: 'pulse-45215.appspot.com',
  messagingSenderId: '196175885786',
  appId: '1:196175885786:web:facc218682bdabaf32fce3',
  measurementId: 'G-RBHWRSCZKF',
};

const app = initializeApp(firebaseConfig);

export namespace FirebaseService {
  export const db = getFirestore(app);
}
