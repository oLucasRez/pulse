import { NotFoundError } from '@domain/errors';
import { DiceModel } from '@domain/models';
import {
  IChangeCentralPulseUsecase,
  IGetCurrentDiceUsecase,
  IGetCurrentGameUsecase,
  INextGameStateUsecase,
  IRollCurrentDiceUsecase,
} from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class RollCurrentDiceUsecase implements IRollCurrentDiceUsecase {
  private readonly changeCentralPulse: IChangeCentralPulseUsecase;
  private readonly getCurrentDice: IGetCurrentDiceUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({
    changeCentralPulse,
    getCurrentDice,
    getCurrentGame,
    nextGameState,
    diceDAO,
    diceHydrator,
  }: Deps) {
    this.changeCentralPulse = changeCentralPulse;
    this.getCurrentDice = getCurrentDice;
    this.getCurrentGame = getCurrentGame;
    this.nextGameState = nextGameState;
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(): Promise<DiceModel> {
    const currentDice = await this.getCurrentDice.execute();

    if (!currentDice)
      throw new NotFoundError({
        metadata: { entity: 'CurrentDice' },
      });

    const value = Math.ceil(Math.random() * currentDice.sides);

    const dto = await this.diceDAO.update(currentDice.id, {
      value,
    });

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const [state] = currentGame.state;

    if (state === 'creating:centralFact')
      await this.changeCentralPulse.execute({ amount: value });

    await this.nextGameState.execute();

    return this.diceHydrator.hydrate(dto);
  }
}

type Deps = {
  changeCentralPulse: IChangeCentralPulseUsecase;
  getCurrentDice: IGetCurrentDiceUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  nextGameState: INextGameStateUsecase;
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};
