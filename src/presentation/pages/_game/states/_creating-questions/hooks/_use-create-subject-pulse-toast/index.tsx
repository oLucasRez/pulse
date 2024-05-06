import { Fragment, ReactNode, useEffect } from 'react';

import { useDice, useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useCreateSubjectPulseToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { currentDice } = useDice();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'create:subjectPulse') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      if (!currentDice?.value) return;

      title = (
        <>
          Crie <em>pulsos</em>
        </>
      );

      description = (
        <p>
          Partindo da posição do seu dado, desenhe {currentDice.value} pulso
          {currentDice.value > 1 && 's'}, cruzando o último pulso com algum
          outro já desenhado no mapa.
        </p>
      );
    } else {
      title = (
        <>
          Etapa de <em>Investigação</em>
        </>
      );

      description = (
        <p>
          <em className={currentPlayer.color}>{currentPlayer.name}</em> está
          desenhando um pulso...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: getColor(currentPlayer.color),
      step: 2 / 4,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn, !currentDice?.value]);
}
