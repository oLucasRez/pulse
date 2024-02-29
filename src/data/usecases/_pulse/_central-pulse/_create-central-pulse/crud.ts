import { CentralPulseModel } from '@domain/models';

import { CentralPulseHydrator } from '@data/hydration';

import {
  CreateCentralFactUsecase,
  CreateCentralPulseUsecase,
} from '@domain/usecases';

import { CentralPulseCRUD } from '@data/cruds';

export class CRUDCreateCentralPulseUsecase
  implements CreateCentralPulseUsecase
{
  private readonly createCentralFact: CreateCentralFactUsecase;
  private readonly centralPulseCRUD: CentralPulseCRUD;

  public constructor(deps: CRUDCreateCentralPulseUsecase.Deps) {
    this.createCentralFact = deps.createCentralFact;
    this.centralPulseCRUD = deps.centralPulseCRUD;
  }

  public async execute(): Promise<CentralPulseModel> {
    const centralFact = await this.createCentralFact.execute();

    const centralPulseDTO = await this.centralPulseCRUD.create({
      origin: { x: 0, y: 0 },
      gap: 1,
      amount: 0,
      landmarkID: centralFact.id,
    });

    return CentralPulseHydrator.hydrate(centralPulseDTO);
  }
}

export namespace CRUDCreateCentralPulseUsecase {
  export type Deps = {
    createCentralFact: CreateCentralFactUsecase;
    centralPulseCRUD: CentralPulseCRUD;
  };
}
