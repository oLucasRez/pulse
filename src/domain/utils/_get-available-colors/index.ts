import { Color } from '@domain/enums';
import { PlayerModel } from '@domain/models';

import { enumToArray } from '..';

export function getAvailableColors(players: PlayerModel[]): Color[] {
  const blockedColors = players.map((player) => player.color);

  const avaiableColors = enumToArray(Color).filter(
    (color) => !blockedColors.includes(color),
  );

  return avaiableColors;
}
