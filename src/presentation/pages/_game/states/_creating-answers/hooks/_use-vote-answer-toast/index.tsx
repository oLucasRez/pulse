import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useGame,
  useNavigate,
  usePlayer,
  useQuestion,
  useToast,
} from '@presentation/hooks';

export function useVoteAnswerToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, myPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { unvotedQuestion } = useQuestion();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  const { navigateToInvestigation } = useNavigate();

  const { pathname } = useLocation();

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
      if (pathname.includes('investigation')) {
        toast.dismiss(state + 'step');
        return;
      }

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
      if (unvotedQuestion)
        action = () => {
          navigateToInvestigation(unvotedQuestion.id);
          toast.dismiss(state + 'step');
        };
    }

    toast.fire('step', {
      id: state + 'step',
      icon: myPlayer.avatar,
      title,
      description,
      color: myPlayer.color,
      actionLabel,
      action,
      step: 2 / 2,
    });
  }, [pathname, turnIsSafe, subState, currentPlayer, myPlayer, isMyTurn]);

  useEffect(() => () => toast.dismissAll(), []);
}
