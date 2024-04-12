import { RoundModel } from '@domain/models';
import { IGetRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration/_round';
import { FetchRoundObserver } from '@data/observers';

export class GetRoundUsecase implements IGetRoundUsecase {
  private readonly roundDAO: IRoundDAO;
  private readonly fetchRoundPublisher: FetchRoundObserver.Publisher;

  public constructor({ roundDAO, fetchRoundPublisher }: Deps) {
    this.roundDAO = roundDAO;
    this.fetchRoundPublisher = fetchRoundPublisher;
  }

  public async execute(id: string): Promise<RoundModel | null> {
    const dto = await this.roundDAO.getByID(id);

    const round = dto ? RoundHydrator.hydrate(dto) : null;

    this.fetchRoundPublisher.notifyFetchRound(id, round);

    return round;
  }
}

type Deps = {
  roundDAO: IRoundDAO;
  fetchRoundPublisher: FetchRoundObserver.Publisher;
};
