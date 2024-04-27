import { NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  ICreateLightSpotUsecase,
  IGetCurrentLightSpotDiceUsecase,
  INextGameStateUsecase,
  IRollCurrentLightSpotDiceUsecase,
} from '@domain/usecases';
import { Vector } from '@domain/utils';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class RollCurrentLightSpotDiceUsecase
  implements IRollCurrentLightSpotDiceUsecase
{
  private readonly createLightSpot: ICreateLightSpotUsecase;
  private readonly getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({
    createLightSpot,
    getCurrentLightSpotDice,
    nextGameState,
    diceDAO,
    diceHydrator,
  }: Deps) {
    this.createLightSpot = createLightSpot;
    this.getCurrentLightSpotDice = getCurrentLightSpotDice;
    this.nextGameState = nextGameState;
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(position: Vector): Promise<DiceModel> {
    const currentLightSpotDice = await this.getCurrentLightSpotDice.execute();

    if (!currentLightSpotDice)
      throw new NotFoundError({
        metadata: { entity: 'CurrentLightSpotDice' },
      });

    const dto = await this.diceDAO.update(currentLightSpotDice.id, {
      position: position.toJSON(),
    });

    await this.createLightSpot.execute();

    await this.nextGameState.execute();

    return this.diceHydrator.hydrate(dto);
  }
}

type Deps = {
  createLightSpot: ICreateLightSpotUsecase;
  getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  nextGameState: INextGameStateUsecase;
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
