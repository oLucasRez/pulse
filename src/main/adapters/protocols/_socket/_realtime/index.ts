import { onValue, ref } from 'firebase/database';

import { SocketProtocol } from '@data/protocols';
import { FirebaseService } from '@data/services';

function parseData<M>(snapshot: Record<string, M>): (M & { id: string })[] {
  return Object.entries(snapshot).map(([id, data]) => ({
    id,
    ...(data as any),
  }));
}

const nullable = 'null-r9rng8bY6d';

function decodeData(data: any): any {
  if (Array.isArray(data)) return data.map((item: any) => decodeData(item));

  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => (data[key] = decodeData(data[key])));

    return data;
  }

  if (data === nullable) return null;

  return data;
}

export class RealtimeSocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P[]) => any): () => void {
    const _ref = ref(FirebaseService.realtimeDB, key);

    return onValue(_ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = parseData<P>(snapshot.val()).map(decodeData);

        callback(data);
      } else callback([]);
    });
  }
}
