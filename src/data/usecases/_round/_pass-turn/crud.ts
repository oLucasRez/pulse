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

    let i = round.currentPlayerID
      ? round.playerIDs.indexOf(round.currentPlayerID)
      : null;

    switch (currentGame.state) {
      case 'creating:subjects':
        if (i === null) i = 0;
        else i++;
        break;
      case 'creating:centralFact':
        if (i === null) i = round.playerIDs.length - 1;
        else i--;
        break;
      default:
        break;
    }

    const playerID = round.playerIDs[i ?? -1];

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
