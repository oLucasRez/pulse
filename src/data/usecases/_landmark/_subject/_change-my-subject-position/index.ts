import { NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  IChangeMySubjectPositionUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';
import { Vector } from '@domain/utils';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class ChangeMySubjectPositionUsecase
  implements IChangeMySubjectPositionUsecase
{
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({
    getMyPlayer,
    nextGameState,
    subjectDAO,
    subjectHydrator,
  }: Deps) {
    this.nextGameState = nextGameState;
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(position: Vector): Promise<SubjectModel> {
    const myPlayer = await this.getMyPlayer.execute();

    if (!myPlayer)
      throw new NotFoundError({ metadata: { entity: 'MyPlayer' } });

    if (!myPlayer.subjectID)
      throw new NotFoundError({ metadata: { entity: 'MySubject' } });

    const dto = await this.subjectDAO.update(myPlayer.subjectID, {
      position: position.toJSON(),
    });

    const subject = await this.subjectHydrator.hydrate(dto);

    await this.nextGameState.execute();

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
