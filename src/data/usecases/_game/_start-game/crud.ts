import { GameModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import {
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  CreateRoundUsecase,
  GetCurrentGameUsecase,
  GetPlayersUsecase,
  SetPlayerDiceUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class CRUDStartGameUsecase implements StartGameUsecase {
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly createRound: CreateRoundUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly setPlayerDice: SetPlayerDiceUsecase;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDStartGameUsecase.Deps) {
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.createRound = deps.createRound;
    this.getCurrentGame = deps.getCurrentGame;
    this.getPlayers = deps.getPlayers;
    this.setPlayerDice = deps.setPlayerDice;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await this.createCentralPulse.execute();

    const dices = await Promise.all([
      this.createDice.execute({ sides: 4 }),
      this.createDice.execute({ sides: 6 }),
      this.createDice.execute({ sides: 8 }),
      this.createDice.execute({ sides: 10 }),
      this.createDice.execute({ sides: 12 }),
    ]);

    const players = await this.getPlayers.execute();
    const notBannedPlayerIDs = players
      .filter(({ banned }) => !banned)
      .map(({ id }) => id);

    await Promise.all(
      notBannedPlayerIDs.map((playerID, i) =>
        this.setPlayerDice.execute(playerID, dices[i].id),
      ),
    );

    const [round, lightspotRound] = await Promise.all([
      this.createRound.execute({ playerIDs: notBannedPlayerIDs }),
      this.createRound.execute({ playerIDs: notBannedPlayerIDs }),
    ]);

    const gameDTO = await this.gameCRUD.update(currentGame.id, {
      started: true,
      state: 'creating:subjects',
      roundID: round.id,
      lightspotRoundID: lightspotRound.id,
    });

    return GameHydrator.hydrate(gameDTO);
  }
}

export namespace CRUDStartGameUsecase {
  export type Deps = {
    createCentralPulse: CreateCentralPulseUsecase;
    createDice: CreateDiceUsecase;
    createRound: CreateRoundUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    getPlayers: GetPlayersUsecase;
    setPlayerDice: SetPlayerDiceUsecase;
    gameCRUD: GameCRUD;
  };
}
