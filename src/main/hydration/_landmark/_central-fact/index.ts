import { CentralFactModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { ICentralFactHydrator } from '@data/hydration';

export class CentralFactHydrator implements ICentralFactHydrator {
  public async hydrate(dto: CentralFactModel.DTO): Promise<CentralFactModel> {
    return {
      id: dto.id,
      description: dto.description,
      color: dto.color,
      position: Vector.fromJSON(dto.position),
      updatedAt: new Date(dto.updatedAt),
      createdAt: new Date(dto.createdAt),
    };
  }
}
