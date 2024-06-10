import { makeGamePath } from '..';

export function makePlayerPaths(): string[] {
  const gamePath = makeGamePath();

  return [gamePath + '/player', gamePath + '/player/:playerID'];
}
