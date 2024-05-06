import { useMemo } from 'react';

import { Color } from '@domain/enums';
import { enumToArray } from '@domain/utils';

import { AvailableColorsHookReturn } from './types';

import { usePlayer } from '../_use-player';
import { useSubject } from '../_use-subject';

export function useAvailableColors(): AvailableColorsHookReturn {
  const { players } = usePlayer();
  const { subjects } = useSubject();

  return useMemo(() => {
    const usedColors = players.map(({ color }) => color);
    usedColors.push(...subjects.map(({ color }) => color));

    return enumToArray(Color).filter((color) => !usedColors.includes(color));
  }, [players, subjects]);
}
