import { NotFoundError } from '@domain/errors';
import { PulseModel, SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

import {
  IDiceDAO,
  ILightSpotDAO,
  IPlayerDAO,
  ISubjectPulseDAO,
} from '@data/dao';
import { ISubjectHydrator } from '@data/hydration';

export class SubjectHydrator implements ISubjectHydrator {
  private readonly diceDAO: IDiceDAO;
  private readonly lightSpotDAO: ILightSpotDAO;
  private readonly playerDAO: IPlayerDAO;
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  public constructor({
    diceDAO,
    lightSpotDAO,
    playerDAO,
    subjectPulseDAO,
  }: Deps) {
    this.diceDAO = diceDAO;
    this.lightSpotDAO = lightSpotDAO;
    this.playerDAO = playerDAO;
    this.subjectPulseDAO = subjectPulseDAO;
  }

  public async hydrate(dto: SubjectModel.DTO): Promise<SubjectModel> {
    const author = await this.playerDAO.getByOrder(dto.order);

    if (!author)
      throw new NotFoundError({
        metadata: { entity: 'Author', prop: 'order', value: dto.order },
      });

    const pulses: PulseModel.DTO[] = await this.subjectPulseDAO.getByLandmarkID(
      dto.id,
    );

    const lightSpot = await this.lightSpotDAO.getByLandmarkID(dto.id);
    if (lightSpot) pulses.push(lightSpot);

    pulses.sort((pulse1, pulse2) => pulse2.createdAt - pulse1.createdAt);

    const dice = await this.diceDAO.getByOrder(author.order);

    return {
      id: dto.id,
      description: dto.description,
      position: dto.position && Vector.fromJSON(dto.position),
      color: dto.color ?? author?.color,
      icon: dto.icon,
      overloaded: dice?.overloaded ?? false,
      pulseIDs: pulses.map(({ id }) => id),
      authorID: author.id,
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}

type Deps = {
  diceDAO: IDiceDAO;
  lightSpotDAO: ILightSpotDAO;
  playerDAO: IPlayerDAO;
  subjectPulseDAO: ISubjectPulseDAO;
};
