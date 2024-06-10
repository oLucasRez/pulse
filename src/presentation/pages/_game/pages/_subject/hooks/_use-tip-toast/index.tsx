import { useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';

const toastID = 'subject-page-tip-toast';

export function useTipToast(): void {
  const { currentGame } = useGame();
  const { isMyTurn, isMyLightSpotTurn } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (state !== 'creating:subjects') return;
    if (!isMyTurn) return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que são <em>Elementos</em>?
        </>
      ),
      description: (
        <>
          <p>
            <em>Elementos</em> são os itens principais da história, e toda a
            trama girará em torno deles!
          </p>
          <p>
            Seja criativo e tente escolher um elemento que combine com os outros
            já escolhidos.
          </p>
        </>
      ),
    });
  }, [state, isMyTurn]);

  useEffect(() => {
    if (state !== 'creating:lightSpot') return;
    if (subState !== 'create:subject') return;
    if (!isMyLightSpotTurn) return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é um <em>Ponto de Luz</em>?
        </>
      ),
      description: (
        <>
          <p>
            <em>Pontos de Luz</em> são elementos secundários já mencionados na
            história e que precisam de atenção.
          </p>
          <p>
            Crie um elemento que contribua para a trama e que pode ser explorado
            de forma mais profunda.
          </p>
        </>
      ),
    });
  }, [state, subState, isMyLightSpotTurn]);

  useEffect(() => () => toast.dismiss(toastID), []);
}
