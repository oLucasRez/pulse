import { RoundModel } from '@domain/models';
import { IGetRoundsUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class GetRoundsUsecase implements IGetRoundsUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ roundDAO, roundHydrator }: Deps) {
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(): Promise<RoundModel[]> {
    const dtos = await this.roundDAO.getAll();

    const rounds = await Promise.all(
      dtos.map((dto) => this.roundHydrator.hydrate(dto)),
    );

    return rounds;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
