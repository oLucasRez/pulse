import { IWatchRoundsUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class WatchRoundsUsecase implements IWatchRoundsUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ roundDAO, roundHydrator }: Deps) {
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(
    callback: IWatchRoundsUsecase.Callback,
  ): Promise<IWatchRoundsUsecase.Response> {
    const unsubscribe = this.roundDAO.watch(async (dtos) => {
      const rounds = await Promise.all(
        dtos.map((dto) => this.roundHydrator.hydrate(dto)),
      );

      callback(rounds);
    });

    return unsubscribe;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
