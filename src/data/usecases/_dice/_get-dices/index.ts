import { DiceModel } from '@domain/models';
import { IGetDicesUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDicesObserver } from '@data/observers';

export class GetDicesUsecase implements IGetDicesUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly fetchDicesPublisher: FetchDicesObserver.Publisher;

  public constructor({ diceDAO, fetchDicesPublisher }: Deps) {
    this.diceDAO = diceDAO;
    this.fetchDicesPublisher = fetchDicesPublisher;
  }

  public async execute(): Promise<DiceModel[]> {
    const dto = await this.diceDAO.getAll();

    const dices = dto.map(DiceHydrator.hydrate);

    this.fetchDicesPublisher.notifyFetchDices(dices);

    return dices;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  fetchDicesPublisher: FetchDicesObserver.Publisher;
};
