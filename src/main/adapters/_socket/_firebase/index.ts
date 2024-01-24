import { collection, onSnapshot } from 'firebase/firestore';

import { SocketProtocol } from '@data/protocols';

import { FirebaseService } from '@data/services';

export class FirebaseSocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P) => any): () => void {
    const unsubscribe = onSnapshot(
      collection(FirebaseService.db, key),
      (snapshot) =>
        callback(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as P,
        ),
    );

    return unsubscribe;
  }
}
