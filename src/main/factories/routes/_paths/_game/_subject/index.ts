import { makeGamePath } from '..';

export function makeSubjectPaths(): string[] {
  const gamePath = makeGamePath();

  return [gamePath + '/subject', gamePath + '/subject/:subjectID'];
}
