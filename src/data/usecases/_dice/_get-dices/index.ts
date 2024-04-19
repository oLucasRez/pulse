import { DiceModel } from '@domain/models';
import { IGetDicesUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class GetDicesUsecase implements IGetDicesUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(): Promise<DiceModel[]> {
    const dtos = await this.diceDAO.getAll();

    const dices = await Promise.all(
      dtos.map((dto) => this.diceHydrator.hydrate(dto)),
    );

    return dices;
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
