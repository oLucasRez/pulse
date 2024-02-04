import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import {
  ChangeUserUsecase,
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  GetCurrentGameUsecase,
  StartGameUsecase,
} from '@domain/usecases';

export class DatabaseStartGameUsecase implements StartGameUsecase {
  private readonly changeUser: ChangeUserUsecase;
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;

  public constructor(deps: DatabaseStartGameUsecase.Deps) {
    this.changeUser = deps.changeUser;
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.getCurrentGame = deps.getCurrentGame;
  }

  public async execute(): Promise<GameModel> {
    const game = await this.getCurrentGame.execute();
    if (!game) throw new ForbiddenError({ metadata: { tried: 'start game' } });

    await this.changeUser.execute({ currentGameID: game.id });

    await this.createCentralPulse.execute();

    await Promise.all([
      this.createDice.execute({ sides: 4 }),
      this.createDice.execute({ sides: 6 }),
      this.createDice.execute({ sides: 8 }),
      this.createDice.execute({ sides: 10 }),
      this.createDice.execute({ sides: 12 }),
    ]);

    return game;
  }
}

export namespace DatabaseStartGameUsecase {
  export type Deps = {
    changeUser: ChangeUserUsecase;
    createCentralPulse: CreateCentralPulseUsecase;
    createDice: CreateDiceUsecase;
    getCurrentGame: GetCurrentGameUsecase;
  };
}
