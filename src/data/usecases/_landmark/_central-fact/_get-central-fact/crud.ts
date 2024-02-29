import { CentralFactModel } from '@domain/models';

import { CentralFactHydrator } from '@data/hydration';

import { GetCentralFactUsecase } from '@domain/usecases';

import { CentralFactCRUD } from '@data/cruds';

export class CRUDGetCentralFactUsecase implements GetCentralFactUsecase {
  private readonly centralFactCRUD: CentralFactCRUD;

  public constructor(deps: CRUDGetCentralFactUsecase.Deps) {
    this.centralFactCRUD = deps.centralFactCRUD;
  }

  public async execute(): Promise<CentralFactModel | null> {
    const [centralFactDTO] = await this.centralFactCRUD.read();

    return centralFactDTO ? CentralFactHydrator.hydrate(centralFactDTO) : null;
  }
}

export namespace CRUDGetCentralFactUsecase {
  export type Deps = {
    centralFactCRUD: CentralFactCRUD;
  };
}
