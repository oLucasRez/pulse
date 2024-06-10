import { Fragment, ReactNode, useEffect } from 'react';

import {
  useDice,
  useGame,
  useGetSubjectsByCrossing,
  usePlayer,
  useToast,
} from '@presentation/hooks';

export function useCreateQuestionToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { currentDice } = useDice();

  const getSubjectsByCrossing = useGetSubjectsByCrossing();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'create:question') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      if (!currentDice?.position) return;

      const subjects = getSubjectsByCrossing(currentDice.position);

      title = (
        <>
          Crie uma <em>Investigação</em>
        </>
      );

      description = (
        <p>
          Comece uma investigação envolvendo{' '}
          {subjects.length === 1
            ? 'apenas o elemento '
            : 'no máximo os elementos '}
          {subjects.map(({ id, icon, color, description }, i) => (
            <Fragment key={id}>
              <em className={color}>
                {icon} {description}
              </em>
              {i === subjects.length - 2
                ? ' e '
                : i === subjects.length - 1
                ? ''
                : ', '}
            </Fragment>
          ))}
          .
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
          criando uma nova investigação...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: currentPlayer.color,
      step: 4 / 4,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn, !currentDice?.position]);

  useEffect(() => () => toast.dismissAll(), []);
}
