import { IDeletePlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';

export class DeletePlayerUsecase implements IDeletePlayerUsecase {
  private readonly playerDAO: IPlayerDAO;
  public constructor({ playerDAO }: Deps) {
    this.playerDAO = playerDAO;
  }

  public async execute(id: string): Promise<void> {
    await this.playerDAO.delete(id);
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
};
