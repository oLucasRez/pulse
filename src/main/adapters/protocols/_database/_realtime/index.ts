import { child, get, ref, remove, set, update } from 'firebase/database';

import { NotFoundError } from '@domain/errors';
import { isNonNullable, uuid } from '@domain/utils';

import { ModelDAO } from '@data/dao';
import { DatabaseProtocol } from '@data/protocols';
import { FirebaseService } from '@data/services';

const nullable = 'null-r9rng8bY6d';

function encodeData(data: Record<string, any>): any {
  if (Array.isArray(data)) return data.map((item: any) => encodeData(item));

  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => (data[key] = encodeData(data[key])));

    return data;
  }

  if (!isNonNullable(data)) return nullable;

  return data;
}

function decodeData(data: any): any {
  if (Array.isArray(data)) return data.map((item: any) => decodeData(item));

  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach((key) => (data[key] = decodeData(data[key])));

    return data;
  }

  if (data === nullable) return null;

  return data;
}

function parseSnapshot<M>(snapshot: Record<string, M>): (M & { id: string })[] {
  return Object.entries(snapshot).map(([id, data]) => ({
    id,
    ...(data as any),
  }));
}

export class RealtimeDatabase implements DatabaseProtocol {
  public async select<M extends ModelDAO.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    const dbRef = ref(FirebaseService.realtimeDB);
    const data = await get(child(dbRef, table))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return parseSnapshot<M>(snapshot.val()).map(decodeData);
        } else return [];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });

    if (data && where) return data.filter(where);

    return data ?? [];
  }

  public async insert<M extends ModelDAO.DTO>(
    table: string,
    data: Omit<M, keyof ModelDAO.DTO>,
  ): Promise<M> {
    const createdAt = Date.now();

    const id = uuid();

    encodeData(data);

    await set(ref(FirebaseService.realtimeDB, `${table}/${id}`), {
      ...data,
      createdAt,
      updatedAt: createdAt,
    });

    decodeData(data);

    return {
      id,
      ...data,
      createdAt,
      updatedAt: createdAt,
    } as M;
  }

  public async update<M extends ModelDAO.DTO>(
    table: string,
    id: string,
    data: Partial<Omit<M, keyof ModelDAO.DTO>>,
  ): Promise<M> {
    const dbRef = ref(FirebaseService.realtimeDB);

    const path = `${table}/${id}`;

    const snapshot = await get(child(dbRef, path));

    if (!snapshot.exists())
      throw new NotFoundError({
        metadata: { entity: 'Data', prop: 'id', value: id },
      });

    const oldData = snapshot.val();

    encodeData(data);

    await update(dbRef, { [path]: { ...oldData, ...data } });

    decodeData(oldData);
    decodeData(data);

    return { id, ...oldData, ...data } as M;
  }

  public async delete(table: string, id: string): Promise<void> {
    remove(ref(FirebaseService.realtimeDB, `${table}/${id}`));
  }
}
