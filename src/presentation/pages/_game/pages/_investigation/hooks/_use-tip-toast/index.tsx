import { useEffect } from 'react';

import { useGame, useToast } from '@presentation/hooks';

const toastID = 'investigation-page-tip-toast';

export function useTipToast(): void {
  const { currentGame } = useGame();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (state !== 'creating:questions') return;
    if (subState !== 'create:question') return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é uma <em>Investigação</em>?
        </>
      ),
      description: (
        <>
          <p>
            <em>Investigações</em> são pontos da história que ainda são
            incertos, lacunas no enredo que ainda precisam ser preenchidas.
          </p>
          <p>
            Elabore uma pergunta que fomente a discussão de um trecho da
            história que ainda precisa de respostas mais claras.
          </p>
        </>
      ),
    });
  }, [state, subState]);

  useEffect(() => () => toast.dismiss(toastID), []);
}
