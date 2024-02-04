import { TableGenerator } from '@data/protocols';

export class UsersTableGeneratorDecorator implements TableGenerator {
  public constructor(private readonly decorated?: TableGenerator) {}

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    if (table) return `users/${table}`;
    return 'users';
  }
}
