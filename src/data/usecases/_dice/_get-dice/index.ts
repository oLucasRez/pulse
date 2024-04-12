import { DiceModel } from '@domain/models';
import { IGetDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDiceObserver } from '@data/observers';

export class GetDiceUsecase implements IGetDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly fetchDicePublisher: FetchDiceObserver.Publisher;

  public constructor({ diceDAO, fetchDicePublisher }: Deps) {
    this.diceDAO = diceDAO;
    this.fetchDicePublisher = fetchDicePublisher;
  }

  public async execute(id: string): Promise<DiceModel | null> {
    const dto = await this.diceDAO.getByID(id);

    const dice = dto ? DiceHydrator.hydrate(dto) : null;

    this.fetchDicePublisher.notifyFetchDice(id, dice);

    return dice;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  fetchDicePublisher: FetchDiceObserver.Publisher;
};
