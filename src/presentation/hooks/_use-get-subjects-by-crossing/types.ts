import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export type GetSubjectsByCrossingHookReturn = (
  crossing: Vector,
) => SubjectModel[];
