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

function clearGarbage(data: Record<any, any>): void {
  Object.keys(data).map((key) => {
    if ((data as any)[key] === undefined) delete (data as any)[key];
  });
}

export class FirebaseDatabase implements DatabaseProtocol {
  public async select<M extends Model>(table: string): Promise<M[]> {
    try {
      const querySnapshot = await getDocs(
        collection(FirebaseService.db, table),
      );

      const data: M[] = [];

      querySnapshot.forEach((doc) =>
        data.push({ id: doc.id, ...doc.data() } as M),
      );

      return data;
    } catch {
      throw new FailedError(`Failed to select data from table [${table}]`);
    }
  }

  public async insert<M extends Model>(
    table: string,
    data: Omit<M, 'id'>,
  ): Promise<M> {
    try {
      const docRef = await addDoc(collection(FirebaseService.db, table), data);

      return { id: docRef.id, ...data } as M;
    } catch {
      throw new FailedError(`Failed to insert data into table [${table}]`);
    }
  }

  public async update<M extends Model>(
    table: string,
    data: Partial<Omit<M, 'id'>> & Pick<M, 'id'>,
  ): Promise<M> {
    const { id, ...updatedData } = data;

    try {
      const docRef = doc(FirebaseService.db, table, id);

      clearGarbage(updatedData);

      await updateDoc(docRef, updatedData);

      const _doc = await getDoc(docRef);
      const newData = _doc.data();

      if (!newData) throw 'the data is missing';

      return { ...newData, id: _doc.id } as M;
    } catch {
      throw new FailedError(`Failed to update data in the table [${table}]`);
    }
  }

  public async delete(table: string, id: string): Promise<void> {
    try {
      const docRef = doc(FirebaseService.db, table, id);

      await deleteDoc(docRef);
    } catch {
      throw new FailedError(`Failed to delete data from table [${table}]`);
    }
  }
}
