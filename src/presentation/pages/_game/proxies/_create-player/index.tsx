import { createContext, FC, useContext, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

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

  const s = useStates({
    myPlayer: null as PlayerModel | null,
    fetchingMyPlayer: true,
  });

  const setMyPlayer = (myPlayer: PlayerModel | null): any =>
    (s.myPlayer = myPlayer);

  const fetchingMyPlayer = (): any => (s.fetchingMyPlayer = true);
  const fetchedMyPlayer = (): any => (s.fetchingMyPlayer = false);

  const { getMyPlayer, watchPlayers } = usePlayerUsecases();
  useEffect(() => {
    fetchingMyPlayer();

    getMyPlayer
      .execute()
      .then(setMyPlayer)
      .catch(logError)
      .finally(fetchedMyPlayer);
  }, []);

  useEffect(() => {
    watchPlayers
      .execute((players) => {
        if (!s.myPlayer) return;

        const myPlayer = players.find((player) => player.id === s.myPlayer?.id);

        if (myPlayer) setMyPlayer(myPlayer);
      })
      .catch(logError);
  }, []);

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
    onSuccess: setMyPlayer,
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
