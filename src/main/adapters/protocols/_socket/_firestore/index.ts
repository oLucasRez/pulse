import { UnknownError } from '@domain/errors';

import { SocketProtocol } from '@data/protocols';

import { FirebaseService } from '@data/services';

import { collection, onSnapshot } from 'firebase/firestore';

export class FirestoreSocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P[]) => any): () => void {
    try {
      const unsubscribe = onSnapshot(
        collection(FirebaseService.firestoreDB, key),
        (snapshot) =>
          callback(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as P[],
          ),
      );

      return unsubscribe;
    } catch {
      throw new UnknownError();
    }
  }
}
