import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

import { Model } from '@domain/models';

import { FailedError } from '@domain/errors';

import { DatabaseProtocol } from '@data/protocols';

import { FirebaseService } from '@data/services';

import { Asyncleton } from '@main/utils';

function clearGarbage(data: Record<any, any>): void {
  Object.keys(data).map((key) => {
    if ((data as any)[key] === undefined) delete (data as any)[key];
  });
}

function asyncletonKey(table: string): string {
  return `firebaseDatabase:${table}`;
}

export class FirebaseDatabase implements DatabaseProtocol {
  public async select<M extends Model>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    try {
      const querySnapshot = await Asyncleton.run(asyncletonKey(table), () =>
        getDocs(collection(FirebaseService.db, table)),
      );

      const data: M[] = [];

      querySnapshot.forEach((doc) =>
        data.push({ id: doc.id, ...doc.data() } as M),
      );

      data.sort((a, b): number => a.createdAt - b.createdAt);

      if (where) return data.filter(where);

      return data;
    } catch {
      throw new FailedError({
        metadata: { tried: `select data from table [${table}]` },
      });
    }
  }

  public async insert<M extends Model>(
    table: string,
    data: Omit<M, keyof Model>,
  ): Promise<M> {
    try {
      Asyncleton.clear(asyncletonKey(table));

      const createdAt = Date.now();

      const docRef = await addDoc(collection(FirebaseService.db, table), {
        ...data,
        createdAt,
        updatedAt: createdAt,
      });

      return { ...data, id: docRef.id } as M;
    } catch {
      throw new FailedError({
        metadata: { tried: `insert data into table [${table}]` },
      });
    }
  }

  public async update<M extends Model>(
    table: string,
    id: string,
    data: Partial<Omit<M, keyof Model>>,
  ): Promise<M> {
    try {
      Asyncleton.clear(asyncletonKey(table));

      const docRef = doc(FirebaseService.db, table, id);

      clearGarbage(data);

      await updateDoc(docRef, { ...data, updatedAt: Date.now() });

      const _doc = await getDoc(docRef);
      const newData = _doc.data();

      if (!newData) throw 'the data is missing';

      return { ...newData, id: _doc.id } as M;
    } catch {
      throw new FailedError({
        metadata: { tried: `update data in the table [${table}]` },
      });
    }
  }

  public async delete(table: string, id: string): Promise<void> {
    try {
      Asyncleton.clear(asyncletonKey(table));

      const docRef = doc(FirebaseService.db, table, id);

      await deleteDoc(docRef);
    } catch {
      throw new FailedError({
        metadata: { tried: `delete data from table [${table}]` },
      });
    }
  }
}
