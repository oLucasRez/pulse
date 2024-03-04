import { createContext, FC, useContext } from 'react';

import { PlayerModel } from '@domain/models';

import { CreatePlayerProxyProps, MyPlayerContextValue } from './types';

import { useMutatePlayerModal } from '../../hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

const Context = createContext({} as MyPlayerContextValue);

export function useMyPlayer(): PlayerModel {
  const { myPlayer } = useContext(Context);

  return myPlayer;
}

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = (props) => {
  const { children } = props;

  const { myPlayer, fetchingMyPlayer } = usePlayerUsecases();

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
  });

  if (fetchingMyPlayer) return <GlobalLoading />;

  if (myPlayer)
    return <Context.Provider value={{ myPlayer }}>{children}</Context.Provider>;

  return <>{renderMutatePlayerModal()}</>;
};
