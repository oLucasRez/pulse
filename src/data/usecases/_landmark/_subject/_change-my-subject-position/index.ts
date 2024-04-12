import { NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  IChangeMySubjectPositionUsecase,
  IGetMyPlayerUsecase,
  INextGameStateUsecase,
} from '@domain/usecases';
import { Vector } from '@domain/utils';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { ChangeSubjectObserver } from '@data/observers';

export class ChangeMySubjectPositionUsecase
  implements IChangeMySubjectPositionUsecase
{
  private readonly getMyPlayer: IGetMyPlayerUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly changeSubjectPublisher: ChangeSubjectObserver.Publisher;

  public constructor({
    getMyPlayer,
    nextGameState,
    subjectDAO,
    changeSubjectPublisher,
  }: Deps) {
    this.nextGameState = nextGameState;
    this.getMyPlayer = getMyPlayer;
    this.subjectDAO = subjectDAO;
    this.changeSubjectPublisher = changeSubjectPublisher;
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

    const subject = SubjectHydrator.hydrate(dto);

    this.changeSubjectPublisher.notifyChangeSubject(subject);

    await this.nextGameState.execute();

    return subject;
  }
}

type Deps = {
  getMyPlayer: IGetMyPlayerUsecase;
  nextGameState: INextGameStateUsecase;
  subjectDAO: ISubjectDAO;
  changeSubjectPublisher: ChangeSubjectObserver.Publisher;
};
