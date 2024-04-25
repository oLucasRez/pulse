import { DiceModel } from '@domain/models';
import { IGetCurrentDiceUsecase, IGetRoundUsecase } from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class GetCurrentDiceUsecase implements IGetCurrentDiceUsecase {
  private readonly getRound: IGetRoundUsecase;
  private readonly diceDAO: IDiceDAO;
  private readonly diceHidrator: IDiceHydrator;
  public constructor({ getRound, diceDAO, diceHidrator }: Deps) {
    this.getRound = getRound;
    this.diceDAO = diceDAO;
    this.diceHidrator = diceHidrator;
  }

  public async execute(): Promise<DiceModel | null> {
    const round = await this.getRound.execute();

    if (!round) return null;
    if (round.i === null) return null;

    const dto = await this.diceDAO.getByOrder(round.i);

    return dto && this.diceHidrator.hydrate(dto);
  }
}

type Deps = {
  getRound: IGetRoundUsecase;
  diceDAO: IDiceDAO;
  diceHidrator: IDiceHydrator;
};
