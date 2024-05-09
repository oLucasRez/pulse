import { useEffect } from 'react';

import { useGame, usePlayer, useToast } from '@presentation/hooks';

const toastID = 'answer-tip-toast';

export function useTipToast(): void {
  const { currentGame } = useGame();
  const { isMyTurn } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const toast = useToast();

  useEffect(() => {
    if (state !== 'creating:answers') return;
    if (subState !== 'create:answer') return;
    if (!isMyTurn) return;

    toast.fire('tip', {
      id: toastID,
      title: (
        <>
          O que é são <em>Conjecturas</em>?
        </>
      ),
      description: (
        <>
          <p>
            <em>Conjecturas</em> são hipóteses elaboradas pelos jogadores que
            pretendem preencher as lacunas abertas pelas investigações.
          </p>
          <p>
            Os jogadores conseguem posteriormente votar na melhor conjectura,
            transformando-a em um <em>fato</em>!
          </p>
        </>
      ),
    });
  }, [state, subState, isMyTurn]);

  useEffect(() => () => toast.dismiss(toastID), []);
}
