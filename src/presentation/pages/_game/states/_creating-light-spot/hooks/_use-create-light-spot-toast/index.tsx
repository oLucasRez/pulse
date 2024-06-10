import { Fragment, ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';

export function useCreateLightSpotToast(): void {
  const { currentGame } = useGame();
  const { currentLightSpotPlayer, isMyLightSpotTurn } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (subState !== 'create:subject') return;

    if (!currentLightSpotPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyLightSpotTurn) {
      title = (
        <>
          Crie o <em>Elemento</em> do <em>Ponto de Luz</em>
        </>
      );

      description = (
        <p>
          Crie um elemento novo para ser um Ponto de Luz. Esse elemento deve
          fazer sentido com a história que está sendo formada aqui.
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
          <em className={currentLightSpotPlayer.color}>
            {currentLightSpotPlayer.name}
          </em>{' '}
          está criando um Ponto de Luz...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentLightSpotPlayer.avatar,
      title,
      description,
      color: currentLightSpotPlayer.color,
      step: 2 / 2,
    });
  }, [subState, currentLightSpotPlayer, isMyLightSpotTurn]);

  useEffect(() => () => toast.dismissAll(), []);
}
