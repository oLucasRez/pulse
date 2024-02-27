import { createContext, FC, useContext, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import { WatchPlayersUsecase } from '@domain/usecases';

import { CreatePlayerProxyProps, MyPlayerContextValue } from './types';

import { useMutatePlayerModal } from '../../hooks';
import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { logError } from '@presentation/utils';

const Context = createContext({} as MyPlayerContextValue);

export function useMyPlayer(): PlayerModel {
  const { myPlayer } = useContext(Context);

  return myPlayer;
}

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    myPlayer: null as PlayerModel | null,
    fetchingMyPlayer: true,
  });

  const { getMyPlayer, watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    set('fetchingMyPlayer', true);

    getMyPlayer
      .execute()
      .then(set('myPlayer'))
      .catch(logError)
      .finally(set('fetchingMyPlayer', false));
  }, []);

  useEffect(() => {
    let unsubscribe: WatchPlayersUsecase.Response;

    watchPlayers
      .execute((players) => {
        if (!s.myPlayer) return;

        const myPlayer = players.find((player) => player.id === s.myPlayer?.id);

        if (myPlayer) s.myPlayer = myPlayer;
      })
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, []);

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
    onSuccess: set('myPlayer'),
  });

  if (s.fetchingMyPlayer) return <GlobalLoading />;

  if (s.myPlayer)
    return (
      <Context.Provider value={{ myPlayer: s.myPlayer }}>
        {children}
      </Context.Provider>
    );

  return <>{renderMutatePlayerModal()}</>;
};
