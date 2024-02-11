import { CacheProtocol } from '@data/protocols';

export class LocalStorageCache implements CacheProtocol {
  public async get<V>(key: string): Promise<V | null> {
    const string = localStorage.getItem(key);

    if (string === null) return null;

    return JSON.parse(string);
  }

  public async set<V>(key: string, value: V): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
