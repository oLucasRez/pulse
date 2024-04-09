import { DiceModel } from '@domain/models';
import { GetDiceUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { FetchDiceObserver } from '@data/observers';

export class DAOGetDiceUsecase implements GetDiceUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly fetchDicePublisher: FetchDiceObserver.Publisher;

  public constructor(deps: DAOGetDiceUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
    this.fetchDicePublisher = deps.fetchDicePublisher;
  }

  public async execute(id: string): Promise<DiceModel | null> {
    const dto = await this.diceDAO.getByID(id);

    const dice = dto ? DiceHydrator.hydrate(dto) : null;

    this.fetchDicePublisher.notifyFetchDice(id, dice);

    return dice;
  }
}

export namespace DAOGetDiceUsecase {
  export type Deps = {
    diceDAO: IDiceDAO;
    fetchDicePublisher: FetchDiceObserver.Publisher;
  };
}
