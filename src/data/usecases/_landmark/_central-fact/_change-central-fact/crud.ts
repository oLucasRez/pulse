import { CentralFactModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { CentralFactHydrator } from '@data/hydration';

import {
  ChangeCentralFactUsecase,
  GetCentralFactUsecase,
} from '@domain/usecases';

import { CentralFactCRUD } from '@data/cruds';

export class CRUDChangeCentralFactUsecase implements ChangeCentralFactUsecase {
  private readonly getCentralFact: GetCentralFactUsecase;
  private readonly centralFactCRUD: CentralFactCRUD;

  public constructor(deps: CRUDChangeCentralFactUsecase.Deps) {
    this.getCentralFact = deps.getCentralFact;
    this.centralFactCRUD = deps.centralFactCRUD;
  }

  public async execute(
    payload: ChangeCentralFactUsecase.Payload,
  ): Promise<CentralFactModel> {
    const { description } = payload;

    const centralFact = await this.getCentralFact.execute();

    if (!centralFact)
      throw new NotFoundError({ metadata: { entity: 'CentralFact' } });

    const centralFactDTO = await this.centralFactCRUD.update(centralFact.id, {
      description,
    });

    return CentralFactHydrator.hydrate(centralFactDTO);
  }
}

export namespace CRUDChangeCentralFactUsecase {
  export type Deps = {
    getCentralFact: GetCentralFactUsecase;
    centralFactCRUD: CentralFactCRUD;
  };
}
