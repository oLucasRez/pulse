import { Fragment, ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useRollDiceToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'roll:dice') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      title = <>Role o dado</>;

      description = (
        <p>
          Clique no seu dado no canto da tela, depois clique e arraste dentro do
          mapa para lançá-lo.
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
          rolando seu dado...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: getColor(currentPlayer.color),
      step: 1 / 4,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn]);
}
