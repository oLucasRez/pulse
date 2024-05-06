import { Fragment, ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useSubject, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useChangeCentralFactToast(): void {
  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn, turnIsSafe } = usePlayer();
  const { mySubject, otherSubjects } = useSubject();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (!turnIsSafe) return;
    if (subState !== 'change:centralFact') return;

    if (!currentPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyTurn) {
      title = (
        <>
          Contribua com o <em>Fato Central</em>
        </>
      );

      description = (
        <p>
          Adicione mais um trecho na composição do Fato Central, citando seu
          elemento,{' '}
          {mySubject && (
            <>
              <em className={mySubject.color}>
                {mySubject.icon} {mySubject.description}
              </em>
              {', '}
            </>
          )}
          e pelo menos mais um outro
          {!!otherSubjects.length && (
            <>
              {' '}
              (
              {otherSubjects.map(({ id, icon, description, color }, i) => (
                <Fragment key={id}>
                  <em className={color}>
                    {icon} {description}
                  </em>
                  {i === otherSubjects.length - 1 ? '' : ', '}
                </Fragment>
              ))}
              )
            </>
          )}
          .
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
          escrevendo no <em>Fato Central</em>...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentPlayer.avatar,
      title,
      description,
      color: getColor(currentPlayer.color),
      step: 1 / 3,
    });
  }, [turnIsSafe, subState, currentPlayer, isMyTurn]);
}
