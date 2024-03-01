import { DeepPartial } from '@domain/types';

import { ModelCRUD } from '@data/cruds';

export interface DatabaseProtocol {
  select<M extends ModelCRUD.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]>;
  insert<M extends ModelCRUD.DTO>(
    table: string,
    data: Omit<M, keyof ModelCRUD.DTO>,
  ): Promise<M>;
  update<M extends ModelCRUD.DTO>(
    table: string,
    id: string,
    data: DeepPartial<Omit<M, keyof ModelCRUD.DTO>>,
  ): Promise<M>;
  delete(table: string, id: string): Promise<void>;
}

export interface TableGenerator {
  getTable(): Promise<string>;
}
