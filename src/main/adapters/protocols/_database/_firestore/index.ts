import { FailedError } from '@domain/errors';

import { DatabaseProtocol } from '@data/protocols';

import { ModelCRUD } from '@data/cruds';

import { FirebaseService } from '@data/services';

import { Asyncleton } from '@main/utils';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

function clearGarbage(data: Record<any, any>): void {
  Object.keys(data).map((key) => {
    if ((data as any)[key] === undefined) delete (data as any)[key];
  });
}

function asyncletonKey(table: string): string {
  return `firestoreDatabase:${table}`;
}

export class FirestoreDatabase implements DatabaseProtocol {
  public async select<M extends ModelCRUD.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]> {
    try {
      const querySnapshot = await Asyncleton.run(asyncletonKey(table), () =>
        getDocs(collection(FirebaseService.firestoreDB, table)),
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

  public async insert<M extends ModelCRUD.DTO>(
    table: string,
    data: Omit<M, keyof ModelCRUD.DTO>,
  ): Promise<M> {
    try {
      Asyncleton.clear(asyncletonKey(table));

      const createdAt = Date.now();

      const docRef = await addDoc(
        collection(FirebaseService.firestoreDB, table),
        {
          ...data,
          createdAt,
          updatedAt: createdAt,
        },
      );

      return { ...data, id: docRef.id } as M;
    } catch {
      throw new FailedError({
        metadata: { tried: `insert data into table [${table}]` },
      });
    }
  }

  public async update<M extends ModelCRUD.DTO>(
    table: string,
    id: string,
    data: Partial<Omit<M, keyof ModelCRUD.DTO>>,
  ): Promise<M> {
    try {
      Asyncleton.clear(asyncletonKey(table));

      const docRef = doc(FirebaseService.firestoreDB, table, id);

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

      const docRef = doc(FirebaseService.firestoreDB, table, id);

      await deleteDoc(docRef);
    } catch {
      throw new FailedError({
        metadata: { tried: `delete data from table [${table}]` },
      });
    }
  }
}
