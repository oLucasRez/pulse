import { ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useVoteAnswerToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, myPlayer, isMyTurn, turnIsSafe } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'vote:answer') return;

    if (!myPlayer) return;
    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;
    let actionLabel: ReactNode = null;
    let action: (() => void) | undefined = undefined;

    if (isMyTurn) {
      title = (
        <>
          Etapa de <em>Votação</em>
        </>
      );

      description = (
        <p>
          Aguarde enquanto os outros jogadores julgam sua conjectura. Se todos
          concordarem, ela será considerada <em>fato</em>!
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
          <em className={myPlayer.color}>{myPlayer.name}</em>, por favor avalie
          a conjectura de{' '}
          <em className={currentPlayer.color}>{currentPlayer.name}</em> e vote
          na melhor hipótese para considerá-la um fato.
        </p>
      );

      actionLabel = 'Votar';
      action = () => {};
    }

    toast.fire('step', {
      id: state + 'step',
      icon: myPlayer.avatar,
      title,
      description,
      color: getColor(myPlayer.color),
      actionLabel,
      action,
      step: 2 / 2,
    });
  }, [turnIsSafe, subState, currentPlayer, myPlayer, isMyTurn]);

  useEffect(() => () => toast.dismissAll(), []);
}
