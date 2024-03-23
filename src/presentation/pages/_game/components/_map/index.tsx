import {
  createContext,
  FC,
  MouseEventHandler,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { Vector, VectorSpace } from '@domain/utils';

import { ms } from '@presentation/constants';
import { useCentralPulseUsecases } from '@presentation/contexts';
import { useInterval, useStates } from '@presentation/hooks';

import { Pulse } from './components';

import { Container, ViewBox } from './styles';

import { MapContextValue, MapProps } from './types';

const Context = createContext<MapContextValue>({
  mapSpace: VectorSpace.identity,
});

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map: FC<MapProps> = (props) => {
  const { children, onMouseMove, onClick } = props;

  const [s] = useStates({
    width: 0,
    height: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);

  function updateSize(): any {
    s.width = divRef.current?.clientWidth ?? 0;
    s.height = divRef.current?.clientHeight ?? 0;
  }

  const { centralPulse } = useCentralPulseUsecases();

  useInterval(updateSize, 300 * ms, [divRef], { firstShot: true });

  const mapSpace = useMemo(
    () =>
      new VectorSpace({
        translate: new Vector([s.width / 2, s.height / 2]),
        scale: Math.max(s.width, s.height) / 40,
      }),
    [s.width, s.height],
  );

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (event) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    onMouseMove?.(
      mapSpace
        .inverse()
        .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace)),
    );
  };

  return (
    <Context.Provider value={{ mapSpace }}>
      <Container ref={divRef}>
        <ViewBox
          size={[s.width, s.height]}
          onMouseMove={handleMouseMove}
          onClick={onClick}
        >
          {centralPulse && <Pulse pulse={centralPulse} />}

          {typeof children === 'function' ? children({ mapSpace }) : children}
        </ViewBox>
      </Container>
    </Context.Provider>
  );
};
