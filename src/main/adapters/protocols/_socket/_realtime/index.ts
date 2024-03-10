import { onValue, ref } from 'firebase/database';

import { SocketProtocol } from '@data/protocols';
import { FirebaseService } from '@data/services';

function parseData<M>(snapshot: Record<string, M>): (M & { id: string })[] {
  return Object.entries(snapshot).map(([id, data]) => ({
    id,
    ...(data as any),
  }));
}

export class RealtimeSocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P[]) => any): () => void {
    const _ref = ref(FirebaseService.realtimeDB, key);

    return onValue(_ref, (snapshot) => {
      const data = parseData<P>(snapshot.val());

      callback(data);
    });
  }
}
