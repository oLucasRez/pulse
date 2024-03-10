import { NotFoundError } from '@domain/errors';
import { CentralFactModel } from '@domain/models';
import {
  ChangeCentralFactUsecase,
  GetCentralFactUsecase,
} from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';

export class DAOChangeCentralFactUsecase implements ChangeCentralFactUsecase {
  private readonly getCentralFact: GetCentralFactUsecase;
  private readonly centralFactDAO: CentralFactDAO;

  public constructor(deps: DAOChangeCentralFactUsecase.Deps) {
    this.getCentralFact = deps.getCentralFact;
    this.centralFactDAO = deps.centralFactDAO;
  }

  public async execute(
    payload: ChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel> {
    const { description } = payload;

    const centralFact = await this.getCentralFact.execute();

    if (!centralFact)
      throw new NotFoundError({ metadata: { entity: 'CentralFact' } });

    const centralFactDTO = await this.centralFactDAO.update(centralFact.id, {
      description,
    });

    return CentralFactHydrator.hydrate(centralFactDTO);
  }
}

export namespace DAOChangeCentralFactUsecase {
  export type Deps = {
    getCentralFact: GetCentralFactUsecase;
    centralFactDAO: CentralFactDAO;
  };
}
