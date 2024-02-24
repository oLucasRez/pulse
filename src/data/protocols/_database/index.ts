import { Model } from '@domain/models';

export interface DatabaseProtocol {
  select<M extends Model.JSON>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]>;
  insert<M extends Model.JSON>(
    table: string,
    data: Omit<M, keyof Model.JSON>,
  ): Promise<M>;
  update<M extends Model.JSON>(
    table: string,
    id: string,
    data: Partial<Omit<M, keyof Model.JSON>>,
  ): Promise<M>;
  delete(table: string, id: string): Promise<void>;
}

export interface TableGenerator {
  getTable(): Promise<string>;
}
