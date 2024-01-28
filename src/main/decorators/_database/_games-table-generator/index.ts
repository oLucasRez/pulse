import { TableGenerator } from '@data/protocols';

export class GamesTableGeneratorDecorator implements TableGenerator {
  public constructor(private readonly decorated?: TableGenerator) {}

  public async getTable(): Promise<string> {
    const table = await this.decorated?.getTable();

    if (table) return `games/${table}`;
    return 'games';
  }
}
