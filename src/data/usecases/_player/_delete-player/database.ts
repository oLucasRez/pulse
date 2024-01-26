import { DeletePlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseDeletePlayerUsecase implements DeletePlayerUsecase {
  public constructor(
    private readonly table: string,
    private readonly database: DatabaseProtocol,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.database.delete(this.table, id);
  }
}
