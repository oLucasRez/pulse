import { makeGamePath } from '..';

export function makeInvestigationPaths(): string[] {
  const gamePath = makeGamePath();

  return [gamePath + '/investigation', gamePath + '/investigation/:questionID'];
}
