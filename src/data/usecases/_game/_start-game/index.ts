import { GameModel } from '@domain/models';

import { ForbiddenError, NotFoundError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import {
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  CreateRoundUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
  SetPlayerDiceUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class StartGame implements StartGameUsecase {
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly createRound: CreateRoundUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly setPlayerDice: SetPlayerDiceUsecase;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: StartGame.Deps) {
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.createRound = deps.createRound;
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.setPlayerDice = deps.setPlayerDice;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel> {
    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'start game without session' },
      });

    if (!me.currentGame)
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

    const gameDTO = await this.gameCRUD.update(me.currentGame.id, {
      started: true,
      state: 'creating:subjects',
      roundID: round.id,
      lightspotRoundID: lightspotRound.id,
    });

    return GameHydrator.hydrate(gameDTO);
  }
}

export namespace StartGame {
  export type Deps = {
    createCentralPulse: CreateCentralPulseUsecase;
    createDice: CreateDiceUsecase;
    createRound: CreateRoundUsecase;
    getMe: GetMeUsecase;
    getPlayers: GetPlayersUsecase;
    setPlayerDice: SetPlayerDiceUsecase;
    gameCRUD: GameCRUD;
  };
}
