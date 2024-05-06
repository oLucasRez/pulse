import { ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useCreateAnswerToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'create:answer') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      title = (
        <>
          Crie uma <em>Conjectura</em>
        </>
      );

      description = (
        <p>
          Escolha uma dentre as investigações abertas e formule uma hipótese
          para respondê-la.
        </p>
      );
    } else {
      title = (
        <>
          Etapa de <em>Conjecturas</em>
        </>
      );

      description = (
        <p>
          <em className={currentPlayer.color}>{currentPlayer.name}</em> está
          formulando uma hipótese pra uma investigação...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: getColor(currentPlayer.color),
      step: 1 / 2,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn]);
}
