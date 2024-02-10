import { createContext, FC, useContext, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import { CreatePlayerProxyProps, MyPlayerContextValue } from './types';

import {
  useCreatePlayerModal,
  useNavigate,
  useStates,
} from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { logError } from '@presentation/utils';

import { useGameLoaderData } from '../../loader';
import { Container } from './styles';

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

  const { me, currentGame } = useGameLoaderData();

  const { navigateToHome, navigateToLogout } = useNavigate();

  const { getMyPlayer } = usePlayerUsecases();
  useEffect(() => {
    fetchingMyPlayer();

    getMyPlayer
      .execute()
      .then(setMyPlayer)
      .catch(logError)
      .finally(fetchedMyPlayer);
  }, []);

  const { renderCreatePlayerModal } = useCreatePlayerModal({
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

  return (
    <>
      <Container>
        <header>
          <button onClick={navigateToHome}>🔙</button>

          <h2>
            <b>{currentGame.title}</b>
          </h2>

          <span className='greetings'>
            🧔🏻‍♂️ Hello, <b>{me?.name}</b>!
          </span>
          <button onClick={navigateToLogout}>🚪</button>
        </header>
      </Container>

      {renderCreatePlayerModal()}
    </>
  );
};
