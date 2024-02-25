import { ms } from '@presentation/constants';
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

import { MapContextValue } from './types';

import { useInterval, useStates } from '@presentation/hooks';

import { useCentralPulseUsecases } from '@presentation/contexts';

import { Pulse } from './components';

import { Container, ViewBox } from './styles';

import { Vector, VectorSpace } from '@domain/utils';
import { logError } from '@presentation/utils';

const Context = createContext({} as MapContextValue);

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map: FC = () => {
  const s = useStates({
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

  const { watchCentralPulse } = useCentralPulseUsecases();
  useEffect(() => {
    let unsubscribe: WatchCentralPulseUsecase.Response;

    watchCentralPulse
      .execute((centralPulse) => (s.centralPulse = centralPulse))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, []);

  return (
    <Context.Provider value={{ mapSpace }}>
      <Container ref={divRef}>
        <ViewBox size={[s.width, s.height]}>
          {s.centralPulse && <Pulse {...s.centralPulse} />}
        </ViewBox>
      </Container>
    </Context.Provider>
  );
};
