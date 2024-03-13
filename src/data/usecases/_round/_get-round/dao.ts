import { RoundModel } from '@domain/models';
import { GetRoundUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { FetchRoundObserver } from '@data/observers';

export class DAOGetRoundUsecase implements GetRoundUsecase {
  private readonly roundDAO: RoundDAO;
  private readonly fetchRoundPublisher: FetchRoundObserver.Publisher;

  public constructor(deps: DAOGetRoundUsecase.Deps) {
    this.roundDAO = deps.roundDAO;
    this.fetchRoundPublisher = deps.fetchRoundPublisher;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const dto = await this.roundDAO.read(id);

    const round = dto ? RoundHydrator.hydrate(dto) : null;

    this.fetchRoundPublisher.notifyFetchRound(id, round);

    return round;
  }
}

export namespace DAOGetRoundUsecase {
  export type Deps = {
    roundDAO: RoundDAO;
    fetchRoundPublisher: FetchRoundObserver.Publisher;
  };
}
