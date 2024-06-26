import { Model } from '@domain/models';
import { DeepPartial } from '@domain/types';
import { uuid } from '@domain/utils';

import { DatabaseProtocol } from '@data/protocols';

import { asyncDelay } from '@main/utils';

export class MemoryDatabase implements DatabaseProtocol {
  private static database: MemoryDatabase.Database = {};

  private static tablesListeners: Record<
    string,
    ((snapshot: Model.DTO[]) => void)[]
  > = {};
  public static subscribeDatabaseChanges<M>(
    table: string,
    callback: (snapshot: M) => void,
  ): () => void {
    if (!MemoryDatabase.tablesListeners[table])
      MemoryDatabase.tablesListeners[table] = [];

    MemoryDatabase.tablesListeners[table].push(callback as any);

    callback(Object.values(MemoryDatabase.database[table] as {}) as M);

    return () =>
      MemoryDatabase.tablesListeners[table].splice(
        MemoryDatabase.tablesListeners[table].indexOf(callback as any, 1),
      );
  }
  private static notifyDatabaseChanged(table: string): void {
    MemoryDatabase.tablesListeners[table]?.forEach((callback) =>
      callback(Object.values(MemoryDatabase.database[table] as {}) as any),
    );
  }

  public async select<M extends Model.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    await asyncDelay(100);

    if (!MemoryDatabase.database[table]) MemoryDatabase.database[table] = {};

    const data: M[] = Object.values(MemoryDatabase.database[table]) as M[];

    data.sort((a, b): number => a.createdAt - b.createdAt);

    if (where) return data.filter(where);

    return data;
  }

  public async insert<M extends Model.DTO>(
    table: string,
    data: Omit<M, keyof Model>,
  ): Promise<M> {
    await asyncDelay(100);

    if (!MemoryDatabase.database[table]) MemoryDatabase.database[table] = {};

    const createdAt = Date.now();

    const result: M = {
      id: uuid(),
      ...(data as any),
      createdAt,
      updatedAt: createdAt,
    };

    MemoryDatabase.database[table][result.id] = result;

    MemoryDatabase.notifyDatabaseChanged(table);

    return result;
  }

  public async update<M extends Model.DTO>(
    table: string,
    id: string,
    data: DeepPartial<Omit<M, keyof Model>>,
  ): Promise<M> {
    await asyncDelay(100);

    const updatedData = MemoryDatabase.database[table][id] ?? {};

    Object.assign(updatedData, data);

    MemoryDatabase.database[table][id] = updatedData;

    MemoryDatabase.notifyDatabaseChanged(table);

    return updatedData as M;
  }

  public async delete(table: string, id: string): Promise<void> {
    await asyncDelay(100);

    delete MemoryDatabase.database[table][id];

    MemoryDatabase.notifyDatabaseChanged(table);
  }
}

export namespace MemoryDatabase {
  export type Database = Record<string, Record<string, Model.DTO>>;
}
