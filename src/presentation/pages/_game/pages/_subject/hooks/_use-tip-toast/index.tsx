import { useEffect } from 'react';

import { useGame, useToast } from '@presentation/hooks';

const toastID = 'subject-page-tip-toast';

export function useTipToast(): void {
  const { currentGame } = useGame();

  const [state] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (state !== 'creating:subjects') return;

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
  }, [state]);

  useEffect(() => () => toast.dismiss(toastID), []);
}
