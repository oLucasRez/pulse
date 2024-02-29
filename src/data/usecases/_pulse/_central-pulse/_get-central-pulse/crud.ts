import { CentralPulseModel } from '@domain/models';

import { CentralPulseHydrator } from '@data/hydration';

import { GetCentralPulseUsecase } from '@domain/usecases';

import { CentralPulseCRUD } from '@data/cruds';

export class CRUDGetCentralPulseUsecase implements GetCentralPulseUsecase {
  private readonly centralPulseCRUD: CentralPulseCRUD;

  public constructor(deps: CRUDGetCentralPulseUsecase.Deps) {
    this.centralPulseCRUD = deps.centralPulseCRUD;
  }

  public async execute(): Promise<CentralPulseModel | null> {
    const [centralPulseDTO] = await this.centralPulseCRUD.read();

    return centralPulseDTO
      ? CentralPulseHydrator.hydrate(centralPulseDTO)
      : null;
  }
}

export namespace CRUDGetCentralPulseUsecase {
  export type Deps = {
    centralPulseCRUD: CentralPulseCRUD;
  };
}
