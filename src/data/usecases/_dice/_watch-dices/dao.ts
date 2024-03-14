import { WatchDicesUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';

export class DAOWatchDicesUsecase implements WatchDicesUsecase {
  private readonly diceDAO: DiceDAO;

  public constructor(deps: DAOWatchDicesUsecase.Deps) {
    this.diceDAO = deps.diceDAO;
  }

  public async execute(
    callback: WatchDicesUsecase.Callback,
  ): Promise<WatchDicesUsecase.Response> {
    const unsubscribe = this.diceDAO.watch((dtos) =>
      callback(dtos.map(DiceHydrator.hydrate)),
    );

    return unsubscribe;
  }
}

export namespace DAOWatchDicesUsecase {
  export type Deps = {
    diceDAO: DiceDAO;
  };
}
