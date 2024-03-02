import { RoundHydrator } from '@data/hydration/_round';

import { RoundModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import {
  GetCurrentGameUsecase,
  GetRoundUsecase,
  PassTurnUsecase,
} from '@domain/usecases';

import { RoundCRUD } from '@data/cruds';

export class CRUDPassTurnUsecase implements PassTurnUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getRound: GetRoundUsecase;
  private readonly roundCRUD: RoundCRUD;

  public constructor(deps: CRUDPassTurnUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getRound = deps.getRound;
    this.roundCRUD = deps.roundCRUD;
  }

  public async execute(id: string): Promise<RoundModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const round = await this.getRound.execute(id);
    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: id },
      });

    if (!round.currentPlayerID) return round;

    let i = round.playerIDs.findIndex(
      (playerID) => playerID === round.currentPlayerID,
    );

    switch (currentGame.state) {
      case 'creating:subjects':
        i++;
        break;
      case 'creating:centralFact':
        i--;
        break;
      default:
        break;
    }

    const playerID = round.playerIDs[i];

    const roundDTO = await this.roundCRUD.update(round.id, {
      currentPlayerID: playerID || null,
    });

    return RoundHydrator.hydrate(roundDTO);
  }
}

export namespace CRUDPassTurnUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getRound: GetRoundUsecase;
    roundCRUD: RoundCRUD;
  };
}
