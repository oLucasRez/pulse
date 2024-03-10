import { DeepPartial } from '@domain/types';

import { ModelDAO } from '@data/dao';

export interface DatabaseProtocol {
  select<M extends ModelDAO.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]>;
  insert<M extends ModelDAO.DTO>(
    table: string,
    data: Omit<M, keyof ModelDAO.DTO>,
  ): Promise<M>;
  update<M extends ModelDAO.DTO>(
    table: string,
    id: string,
    data: DeepPartial<Omit<M, keyof ModelDAO.DTO>>,
  ): Promise<M>;
  delete(table: string, id: string): Promise<void>;
}

export interface TableGenerator {
  getTable(): Promise<string>;
}
