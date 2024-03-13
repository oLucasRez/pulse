import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { CentralPulseModel } from '@domain/models';
import { WatchCentralPulseUsecase } from '@domain/usecases';
import { Vector, VectorSpace } from '@domain/utils';

import { ms } from '@presentation/constants';
import {
  useCentralPulseUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { useInterval, useStates } from '@presentation/hooks';
import { logError } from '@presentation/utils';

import { useMutateSubjectModal } from '../../hooks';

import { PlayersList, Pulse } from './components';

import { Container, ViewBox } from './styles';

import { MapContextValue } from './types';

const Context = createContext({} as MapContextValue);

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map: FC = () => {
  const [s, set] = useStates({
    centralPulse: null as CentralPulseModel | null,
    width: 0,
    height: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const div = divRef.current;

  function updateSize(): any {
    s.width = div?.clientWidth ?? 0;
    s.height = div?.clientHeight ?? 0;
  }

  useInterval(updateSize, 300 * ms, [div], { firstShot: true });

  const mapSpace = useMemo(
    () =>
      new VectorSpace({
        translate: new Vector([s.width / 2, s.height / 2]),
        scale: Math.max(s.width, s.height) / 40,
      }),
    [s.width, s.height],
  );

  const { currentGame } = useGameUsecases();

  const { watchCentralPulse } = useCentralPulseUsecases();
  useEffect(() => {
    let unsubscribe: WatchCentralPulseUsecase.Response;

    watchCentralPulse
      .execute(set('centralPulse'))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, []);

  const { currentPlayer, passTurn } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const { renderMutateSubjectModal, openMutateSubjectModal } =
    useMutateSubjectModal({ onSuccess: passTurn });

  useEffect(() => {
    if (currentGame?.state !== 'creating:subjects') return;

    if (isMyTurn) openMutateSubjectModal();
  }, [isMyTurn]);

  return (
    <Context.Provider value={{ mapSpace }}>
      <Container ref={divRef}>
        <PlayersList />

        <ViewBox size={[s.width, s.height]}>
          {s.centralPulse && <Pulse {...s.centralPulse} />}
        </ViewBox>

        {renderMutateSubjectModal()}
      </Container>
    </Context.Provider>
  );
};
