import { ForbiddenError, NotFoundError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import {
  ICreateLightSpotSubjectUsecase,
  IGetCurrentLightSpotDiceUsecase,
  INextGameStateUsecase,
  ISetDicePositionUsecase,
  ISetLightSpotLandmarkUsecase,
} from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class CreateLightSpotSubjectUsecase
  implements ICreateLightSpotSubjectUsecase
{
  private readonly getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly setDicePosition: ISetDicePositionUsecase;
  private readonly setLightSpotLandmark: ISetLightSpotLandmarkUsecase;
  private readonly subjectDAO: ISubjectDAO;
  private readonly subjectHydrator: ISubjectHydrator;
  public constructor({
    getCurrentLightSpotDice,
    nextGameState,
    setDicePosition,
    setLightSpotLandmark,
    subjectDAO,
    subjectHydrator,
  }: Deps) {
    this.getCurrentLightSpotDice = getCurrentLightSpotDice;
    this.nextGameState = nextGameState;
    this.setDicePosition = setDicePosition;
    this.setLightSpotLandmark = setLightSpotLandmark;
    this.subjectDAO = subjectDAO;
    this.subjectHydrator = subjectHydrator;
  }

  public async execute(
    payload: ICreateLightSpotSubjectUsecase.Payload,
  ): Promise<SubjectModel> {
    const { description, icon, color } = payload;

    const currentLightSpotDice = await this.getCurrentLightSpotDice.execute();

    if (!currentLightSpotDice)
      throw new NotFoundError({ metadata: { entity: 'CurrentLightSpotDice' } });
    if (!currentLightSpotDice.ownerID)
      throw new NotFoundError({ metadata: { entity: 'DiceOwner' } });
    if (!currentLightSpotDice.position)
      throw new ForbiddenError({
        metadata: {
          tried: 'create light-spot-subject without positioning the dice',
        },
      });

    const dto = await this.subjectDAO.create({
      description,
      icon,
      color,
      order: currentLightSpotDice.order,
      position: currentLightSpotDice.position.toJSON(),
    });

    await this.setLightSpotLandmark.execute(dto.id);

    await this.setDicePosition.execute(currentLightSpotDice.id, null);

    await this.nextGameState.execute();

    return this.subjectHydrator.hydrate(dto);
  }
}

type Deps = {
  getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  nextGameState: INextGameStateUsecase;
  setDicePosition: ISetDicePositionUsecase;
  setLightSpotLandmark: ISetLightSpotLandmarkUsecase;
  subjectDAO: ISubjectDAO;
  subjectHydrator: ISubjectHydrator;
};
