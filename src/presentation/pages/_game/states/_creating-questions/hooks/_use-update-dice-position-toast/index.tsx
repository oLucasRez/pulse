import { Fragment, ReactNode, useEffect } from 'react';

import { useDice, useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useUpdateDicePositionToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { currentDice } = useDice();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'update:dice:position') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      if (!currentDice?.value) return;

      title = (
        <>
          Reposicione seu <em className={currentPlayer.color}>dado</em>
        </>
      );

      description = (
        <p>
          Escolha qualquer cruzamento no último pulso recém criado para
          reposicionar seu dado no mapa.
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
          reposicionando seu dado no mapa...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: getColor(currentPlayer.color),
      step: 3 / 4,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn, !currentDice?.value]);
}
