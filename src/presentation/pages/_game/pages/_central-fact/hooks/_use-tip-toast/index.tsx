import { useEffect } from 'react';

import { useGame, useToast } from '@presentation/hooks';

const toastID = 'central-fact-page-tip-toast';

export function useTipToast(): void {
  const { currentGame } = useGame();

  const [state] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (state !== 'creating:centralFact') return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é o <em>Fato Central</em>?
        </>
      ),
      description: (
        <>
          <p>
            O <em>Fato Central</em> é a cena final da nossa história, envolvendo
            todos os Elementos. Lacunas ou questões em aberto serão respondidas
            ao longo do jogo.
          </p>
          <p>
            Seja criativo e ajude a montar uma cena com vários mistérios a serem
            solucionados e com potencial para construir uma história incrível!
          </p>
        </>
      ),
    });
  }, [state]);

  useEffect(() => () => toast.dismiss(toastID), []);
}
