import { onValue, ref } from 'firebase/database';

import { SocketProtocol } from '@data/protocols';
import { FirebaseService } from '@data/services';

import { FirebaseRealtimeDBHelper } from '../../helpers';

export class RealtimeSocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P[]) => any): () => void {
    const _ref = ref(FirebaseService.realtimeDB, key);

    return onValue(_ref, (snapshot) => {
      if (snapshot.exists()) {
        const data = FirebaseRealtimeDBHelper.parseData<P>(snapshot.val()).map(
          FirebaseRealtimeDBHelper.decodeData,
        );

        callback(data);
      } else callback([]);
    });
  }
}
