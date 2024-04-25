import { IPlayerHydrator } from '@data/hydration';

import { makeDiceDAO, makeSubjectDAO } from '@main/factories';
import { PlayerHydrator } from '@main/hydration';

export function makePlayerHydrator(): IPlayerHydrator {
  const diceDAO = makeDiceDAO();
  const subjectDAO = makeSubjectDAO();

  return new PlayerHydrator({ diceDAO, subjectDAO });
}
