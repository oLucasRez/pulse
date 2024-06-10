import { Fragment, ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useSubject, useToast } from '@presentation/hooks';

export function useCretingSubjectsToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { otherSubjects } = useSubject();

  const [state] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (state !== 'creating:subjects') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      title = (
        <>
          Crie seu <em>Elemento</em>
        </>
      );

      description = (
        <p>
          Escolha seu elemento principal da história
          {otherSubjects.length ? (
            <>
              {otherSubjects.length > 1
                ? '. Os outros jogadores já criaram os elementos '
                : '. O outro jogador já criou o elemento '}
              {otherSubjects.map(({ id, color, icon, description }, i) => {
                const separator =
                  i < otherSubjects.length - 2
                    ? ', '
                    : i < otherSubjects.length - 1
                    ? ' e '
                    : '';

                return (
                  <Fragment key={id}>
                    <em className={color}>
                      {icon} {description}
                    </em>
                    {separator}
                  </Fragment>
                );
              })}
            </>
          ) : (
            ''
          )}
          .
        </p>
      );
    } else {
      title = (
        <>
          Etapa de <em>Criação dos Elementos</em>
        </>
      );

      description = (
        <p>
          <em className={currentPlayer.color}>{currentPlayer.name}</em> está
          criando seu elemento...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: currentPlayer.color,
      step: 1 / 1,
    });
  }, [turnIsSafe, state, currentPlayer, isMyTurn]);

  useEffect(() => () => toast.dismissAll(), []);
}
