import { makeGamePath } from '..';

export function makeCentralFactPath(): string {
  const gamePath = makeGamePath();

  return gamePath + '/central-fact';
}
