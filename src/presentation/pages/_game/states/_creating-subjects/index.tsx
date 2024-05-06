import { FC, useEffect } from 'react';

import { useGame, useNavigate, usePlayer } from '@presentation/hooks';

import { useCretingSubjectsToast } from './hooks';

import { Map, Pulses, Subjects } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentGame } = useGame();
  const { isMyTurn, turnIsSafe } = usePlayer();

  const [state] = currentGame?.state ?? [];

  const { navigateToSubject } = useNavigate();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (!isMyTurn) return;
    if (state !== 'creating:subjects') return;

    navigateToSubject();
  }, [turnIsSafe, isMyTurn, state]);

  useCretingSubjectsToast();

  return (
    <Map>
      <Pulses />
      <Subjects />
    </Map>
  );
};
