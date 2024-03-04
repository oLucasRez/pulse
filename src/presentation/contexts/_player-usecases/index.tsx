import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import {
  BanPlayerUsecase,
  ChangePlayerUsecase,
  CreatePlayerUsecase,
  WatchMyPlayerUsecase,
  WatchPlayersUsecase,
} from '@domain/usecases';

import {
  PlayerUsecasesContextProviderProps,
  PlayerUsecasesContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import { useGameUsecases } from '..';

const Context = createContext({} as PlayerUsecasesContextValue);

export const usePlayerUsecases = (): PlayerUsecasesContextValue =>
  useContext(Context);

export const PlayerUsecasesContextProvider: FC<
  PlayerUsecasesContextProviderProps
> = (props) => {
  const {
    watchPlayers,
    watchMyPlayer,

    children,
  } = props;

  const [s, set] = useStates({
    players: [] as PlayerModel[],
    myPlayer: null as PlayerModel | null,
    fetchingMyPlayer: false,
    currentPlayer: null as PlayerModel | null,
  });

  const { currentGame } = useGameUsecases();

  useEffect(() => {
    if (!currentGame) {
      set('players')([]);
      return;
    }

    let unsubscribe: WatchPlayersUsecase.Response;

    watchPlayers
      .execute(set('players'))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, [currentGame?.id]);

  useEffect(() => {
    if (!currentGame) {
      set('currentPlayer')(null);
      set('fetchingMyPlayer')(false);
      return;
    }

    set('fetchingMyPlayer')(true);

    let unsubscribe: WatchMyPlayerUsecase.Response;

    watchMyPlayer
      .execute((myPlayer) => {
        set('myPlayer')(myPlayer);
        set('fetchingMyPlayer')(false);
      })
      .then((value) => (unsubscribe = value))
      .catch(set('fetchingMyPlayer', false));

    return () => unsubscribe?.();
  }, [currentGame?.id]);

  const createPlayer = useCallback<CreatePlayerUsecase['execute']>(
    async (payload: CreatePlayerUsecase.Payload) => {
      const player = await props.createPlayer.execute(payload);

      set('players')(([...players]) => {
        players.splice(
          players.findIndex(({ id }) => id === player.id),
          1,
          player,
        );

        return players;
      });

      return player;
    },
    [props.createPlayer, set],
  );

  const changePlayer = useCallback<ChangePlayerUsecase['execute']>(
    async (payload: ChangePlayerUsecase.Payload) => {
      const player = await props.changePlayer.execute(payload);

      set('players')(([...players]) => {
        players.splice(
          players.findIndex(({ id }) => id === player.id),
          1,
          player,
        );

        return players;
      });

      return player;
    },
    [props.changePlayer, set],
  );

  const banPlayer = useCallback<BanPlayerUsecase['execute']>(
    async (id: string) => {
      await props.banPlayer.execute(id);

      set('players')(([...players]) => {
        players.splice(
          players.findIndex((player) => player.id === id),
          1,
        );

        return players;
      });
    },
    [props.banPlayer, set],
  );

  return (
    <Context.Provider
      value={{
        players: s.players,
        myPlayer: s.myPlayer,
        fetchingMyPlayer: s.fetchingMyPlayer,
        currentPlayer: s.currentPlayer,
        createPlayer,
        changePlayer,
        banPlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
