import { CentralFactModel } from '@domain/models';

import { CentralFactHydrator } from '@data/hydration';

import { CreateCentralFactUsecase } from '@domain/usecases';

import { CentralFactCRUD } from '@data/cruds';

export class CRUDCreateCentralFactUsecase implements CreateCentralFactUsecase {
  private readonly centralFactCRUD: CentralFactCRUD;

  public constructor(deps: CRUDCreateCentralFactUsecase.Deps) {
    this.centralFactCRUD = deps.centralFactCRUD;
  }

  public async execute(): Promise<CentralFactModel> {
    const centralFactCRUD = await this.centralFactCRUD.create({
      position: { x: 0, y: 0 },
      description: '',
    });

    return CentralFactHydrator.hydrate(centralFactCRUD);
  }
}

export namespace CRUDCreateCentralFactUsecase {
  export type Deps = {
    centralFactCRUD: CentralFactCRUD;
  };
}
