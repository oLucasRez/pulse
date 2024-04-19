import { IWatchDicesUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class WatchDicesUsecase implements IWatchDicesUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(
    callback: IWatchDicesUsecase.Callback,
  ): Promise<IWatchDicesUsecase.Response> {
    const unsubscribe = this.diceDAO.watch(async (dtos) => {
      const dices = await Promise.all(
        dtos.map((dto) => this.diceHydrator.hydrate(dto)),
      );

      callback(dices);
    });

    return unsubscribe;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
