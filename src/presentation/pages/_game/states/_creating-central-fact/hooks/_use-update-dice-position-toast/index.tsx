import { ReactNode, useEffect } from 'react';

import { useDice, useGame, usePlayer, useToast } from '@presentation/hooks';

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

      title = <>Posicione seu dado no mapa</>;

      description = (
        <p>
          Escolha qualquer posição no {currentDice.value}º pulso central para
          colocar seu dado.
        </p>
      );
    } else {
      title = (
        <>
          Etapa de <em>Criação do Fato Central</em>
        </>
      );

      description = (
        <p>
          <em className={currentPlayer.color}>{currentPlayer.name}</em> está
          posicionando seu dado no mapa...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: currentPlayer.color,
      step: 3 / 3,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn, !currentDice?.value]);

  useEffect(() => () => toast.dismissAll(), []);
}
