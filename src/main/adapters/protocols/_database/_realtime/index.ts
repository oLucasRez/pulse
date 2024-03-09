import { child, get, ref, remove, set, update } from 'firebase/database';

import { NotFoundError } from '@domain/errors';

import { DatabaseProtocol } from '@data/protocols';

import { ModelCRUD } from '@data/cruds';

import { FirebaseService } from '@data/services';

import { uuid } from '@domain/utils';

function parseData<M>(snapshot: Record<string, M>): (M & { id: string })[] {
  return Object.entries(snapshot).map(([id, data]) => ({
    id,
    ...(data as any),
  }));
}

export class RealtimeDatabase implements DatabaseProtocol {
  public async select<M extends ModelCRUD.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    const dbRef = ref(FirebaseService.realtimeDB);
    const data = await get(child(dbRef, table))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return parseData<M>(snapshot.val());
        } else return [];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });

    if (data && where) return data.filter(where);

    return data ?? [];
  }

  public async insert<M extends ModelCRUD.DTO>(
    table: string,
    data: Omit<M, keyof ModelCRUD.DTO>,
  ): Promise<M> {
    const createdAt = Date.now();

    const id = uuid();

    await set(ref(FirebaseService.realtimeDB, `${table}/${id}`), {
      ...data,
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

  public async update<M extends ModelCRUD.DTO>(
    table: string,
    id: string,
    data: Partial<Omit<M, keyof ModelCRUD.DTO>>,
  ): Promise<M> {
    const dbRef = ref(FirebaseService.realtimeDB);

    const path = `${table}/${id}`;

    const snapshot = await get(child(dbRef, path));

    if (!snapshot.exists())
      throw new NotFoundError({
        metadata: { entity: 'Data', prop: 'id', value: id },
      });

    const oldData = snapshot.val();

    await update(dbRef, { [path]: { ...oldData, ...data } });

    return { id, ...oldData, ...data } as M;
  }

  public async delete(table: string, id: string): Promise<void> {
    remove(ref(FirebaseService.realtimeDB, `${table}/${id}`));
  }
}
