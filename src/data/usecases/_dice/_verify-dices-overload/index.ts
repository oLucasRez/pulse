import { DiceModel } from '@domain/models';
import { IVerifyDicesOverloadUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class VerifyDicesOverloadUsecase implements IVerifyDicesOverloadUsecase {
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ diceDAO, diceHydrator }: Deps) {
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(): Promise<DiceModel[]> {
    const dtos = await this.diceDAO.getAll();

    return Promise.all(
      dtos
        .filter(({ overloaded }) => !overloaded)
        .map(async (dto) => {
          const overloadCount = dto.overloadCount + (dto.value ?? 0);

          dto = await this.diceDAO.update(dto.id, {
            overloadCount,
            overloaded: overloadCount >= dto.sides,
          });

          return this.diceHydrator.hydrate(dto);
        }),
    );
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
