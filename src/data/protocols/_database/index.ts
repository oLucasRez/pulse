import { Model } from '@domain/models';
import { DeepPartial } from '@domain/types';

export interface DatabaseProtocol {
  select<M extends Model.DTO>(
    table: string,
    where?: (value: M) => boolean,
  ): Promise<M[]>;
  insert<M extends Model.DTO>(
    table: string,
    data: Omit<M, keyof Model.DTO>,
  ): Promise<M>;
  update<M extends Model.DTO>(
    table: string,
    id: string,
    data: DeepPartial<Omit<M, keyof Model.DTO>>,
  ): Promise<M>;
  delete(table: string, id: string): Promise<void>;
}
