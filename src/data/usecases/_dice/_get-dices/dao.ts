import { DiceModel } from '@domain/models';
import { GetDicesUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDicesObserver } from '@data/observers';

export class DAOGetDicesUsecase implements GetDicesUsecase {
  private readonly diceDAO: DiceDAO;
  private readonly fetchDicesPublisher: FetchDicesObserver.Publisher;

  public constructor(deps: DAOGetDicesUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
    this.fetchDicesPublisher = deps.fetchDicesPublisher;
  }

  public async execute(): Promise<DiceModel[]> {
    const dto = await this.diceDAO.read();

    const dices = dto.map(DiceHydrator.hydrate);

    this.fetchDicesPublisher.notifyFetchDices(dices);

    return dices;
  }
}

export namespace DAOGetDicesUsecase {
  export type Deps = {
    diceDAO: DiceDAO;
    fetchDicesPublisher: FetchDicesObserver.Publisher;
  };
}
