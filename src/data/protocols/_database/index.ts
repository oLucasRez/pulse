import { Model } from '@domain/models';

export interface DatabaseProtocol {
  select<M extends Model>(table: string): Promise<M[]>;
  insert<M extends Model>(table: string, data: Omit<M, 'id'>): Promise<M>;
  update<M extends Model>(
    table: string,
    data: Partial<Omit<M, 'id'>> & Pick<M, 'id'>,
  ): Promise<M>;
  delete(table: string, id: string): Promise<void>;
}
