import { Fragment, ReactNode, useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

export function useRollDiceToast(): void {
  const { currentGame } = useGame();
  const { currentLightSpotPlayer, isMyLightSpotTurn } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (subState !== 'roll:dice') return;

    if (!currentLightSpotPlayer) return;

    let title: ReactNode = null;
    let description: ReactNode = null;

    if (isMyLightSpotTurn) {
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
          Etapa de <em>Ponto de Luz</em>
        </>
      );

      description = (
        <p>
          <em className={currentLightSpotPlayer.color}>
            {currentLightSpotPlayer.name}
          </em>{' '}
          está rolando seu dado...
        </p>
      );
    }

    toast.fire('step', {
      id: state + 'step',
      icon: currentLightSpotPlayer.avatar,
      title,
      description,
      color: getColor(currentLightSpotPlayer.color),
      step: 1 / 2,
    });
  }, [subState, currentLightSpotPlayer, isMyLightSpotTurn]);
}
