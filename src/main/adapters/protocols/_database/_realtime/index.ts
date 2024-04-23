import { child, get, ref, remove, set, update } from 'firebase/database';

import { NotFoundError } from '@domain/errors';
import { Model } from '@domain/models';
import { DeepPartial } from '@domain/types';
import { deepMerge, uuid } from '@domain/utils';

import { DatabaseProtocol } from '@data/protocols';
import { FirebaseService } from '@data/services';

import { FirebaseRealtimeDBHelper } from '../../helpers';

function clearGarbage(data: Record<any, any>): void {
  Object.keys(data).map((key) => {
    if ((data as any)[key] === undefined) delete (data as any)[key];
  });
}

export class RealtimeDatabase implements DatabaseProtocol {
  public async select<M extends Model.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    const dbRef = ref(FirebaseService.realtimeDB);
    const data = await get(child(dbRef, table))
      .then((snapshot) => {
        if (snapshot.exists())
          return FirebaseRealtimeDBHelper.parseData<M>(snapshot.val()).map(
            FirebaseRealtimeDBHelper.decodeData,
          );
        else return [];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });

    if (data && where) return data.filter(where);

    return data ?? [];
  }

  public async insert<M extends Model.DTO>(
    table: string,
    data: Omit<M, keyof Model.DTO>,
  ): Promise<M> {
    const createdAt = Date.now();

    const id = uuid();

    const encodedData = FirebaseRealtimeDBHelper.encodeData(data);

    await set(ref(FirebaseService.realtimeDB, `${table}/${id}`), {
      ...encodedData,
      createdAt,
      updatedAt: createdAt,
    });

    return {
      id,
      ...data,
      createdAt,
      updatedAt: createdAt,
    } as M;
  }

  public async update<M extends Model.DTO>(
    table: string,
    id: string,
    data: DeepPartial<Omit<M, keyof Model.DTO>>,
  ): Promise<M> {
    const dbRef = ref(FirebaseService.realtimeDB);

    const path = `${table}/${id}`;

    const snapshot = await get(child(dbRef, path));

    if (!snapshot.exists())
      throw new NotFoundError({
        metadata: { entity: 'Data', prop: 'id', value: id },
      });

    const oldData = snapshot.val();

    clearGarbage(data);

    const encodedData = FirebaseRealtimeDBHelper.encodeData(data);

    const mergedData = deepMerge({}, oldData, encodedData);

    await update(dbRef, { [path]: mergedData });

    const decodedMergedData = FirebaseRealtimeDBHelper.decodeData(mergedData);

    return { id, ...decodedMergedData } as M;
  }

  public async delete(table: string, id: string): Promise<void> {
    remove(ref(FirebaseService.realtimeDB, `${table}/${id}`));
  }
}
