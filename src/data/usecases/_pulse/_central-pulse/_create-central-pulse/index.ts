import { CentralPulseModel } from '@domain/models';
import {
  ICreateCentralFactUsecase,
  ICreateCentralPulseUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { ICentralPulseHydrator } from '@data/hydration';

export class CreateCentralPulseUsecase implements ICreateCentralPulseUsecase {
  private readonly createCentralFact: ICreateCentralFactUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly centralPulseHydrator: ICentralPulseHydrator;
  public constructor({
    createCentralFact,
    centralPulseDAO,
    centralPulseHydrator,
  }: Deps) {
    this.createCentralFact = createCentralFact;
    this.centralPulseDAO = centralPulseDAO;
    this.centralPulseHydrator = centralPulseHydrator;
  }

  public async execute(): Promise<CentralPulseModel> {
    const centralFact = await this.createCentralFact.execute();

    const dto = await this.centralPulseDAO.create({
      origin: { x: 0, y: 0 },
      gap: 1,
      amount: 0,
      landmarkID: centralFact.id,
    });

    const centralPulse = await this.centralPulseHydrator.hydrate(dto);

    return centralPulse;
  }
}

type Deps = {
  createCentralFact: ICreateCentralFactUsecase;
  centralPulseDAO: ICentralPulseDAO;
  centralPulseHydrator: ICentralPulseHydrator;
};
