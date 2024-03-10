import { NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import { GetMyPlayerUsecase, SetPlayerSubjectUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { ChangePlayerObserver } from '@data/observers';

export class DAOSetPlayerSubjectUsecase implements SetPlayerSubjectUsecase {
  private readonly getMyPlayer: GetMyPlayerUsecase;
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerDAO: PlayerDAO;

  public constructor(deps: DAOSetPlayerSubjectUsecase.Deps) {
    this.getMyPlayer = deps.getMyPlayer;
    this.changePlayerPublisher = deps.changePlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(subjectID: string): Promise<PlayerModel> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    const dto = await this.playerDAO.update(myPlayer.id, {
      subjectID,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.changePlayerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace DAOSetPlayerSubjectUsecase {
  export type Deps = {
    getMyPlayer: GetMyPlayerUsecase;
    changePlayerPublisher: ChangePlayerObserver.Publisher;
    playerDAO: PlayerDAO;
  };
}
