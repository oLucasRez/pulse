export interface CacheProtocol {
  get<V>(key: string): Promise<V | null>;
  set<V>(key: string, value: V): Promise<void>;
  remove(key: string): Promise<void>;
}
