import { cloneElement, FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Navigate } from '@presentation/components';
import { usePlayer } from '@presentation/hooks';

import {
  PlayerExistsProxyChildrenProps,
  PlayerExistsProxyProps,
} from './types';

export const PlayerExistsProxy: FC<PlayerExistsProxyProps> = ({ children }) => {
  const params = useParams();

  const { players } = usePlayer();

  const player = useMemo(
    () => players.find(({ id }) => id === params.playerID) ?? null,
    [players, params.playerID],
  );

  if (params.playerID && !player) return <Navigate.toGame replace />;

  return cloneElement(children, { player });
};

export namespace PlayerExistsProxy {
  export type ChildrenProps = PlayerExistsProxyChildrenProps;
}
