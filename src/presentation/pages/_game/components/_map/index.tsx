import {
  createContext,
  FC,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { Vector, VectorSpace } from '@domain/utils';

import { Transition } from '@presentation/components';
import { ms } from '@presentation/constants';
import { useEvent, useInterval, useStates } from '@presentation/hooks';

import { Container, ViewBox } from './styles';

import { MapContextValue, MapProps } from './types';

const bounds = { top: -20, left: -20, right: 20, bottom: 20 };

const Context = createContext<MapContextValue>({
  mapSpace: VectorSpace.identity,
  bounds,
  onMouseMove: () => () => {},
  onMouseDown: () => () => {},
  onMouseUp: () => () => {},
  onClick: () => () => {},
  openBakingPaper: () => {},
  closeBakingPaper: () => {},
});

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map: FC<MapProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    width: 0,
    height: 0,
    portal: null as ReactNode,
  });

  const divRef = useRef<HTMLDivElement>(null);

  function updateSize() {
    s.width = divRef.current?.clientWidth ?? 0;
    s.height = divRef.current?.clientHeight ?? 0;
  }

  useInterval(updateSize, 100 * ms, [divRef], { firstShot: true });

  const mapSpace = useMemo(
    () =>
      new VectorSpace({
        translate: new Vector([s.width / 2, s.height / 2]),
        scale: Math.max(s.width, s.height) / (bounds.right - bounds.left),
      }),
    [s.width, s.height],
  );

  const mouseMove = useEvent<(mouse: Vector) => void>();
  const mouseDown = useEvent<(mouse: Vector) => void>();
  const mouseUp = useEvent<(mouse: Vector) => void>();
  const click = useEvent<(mouse: Vector) => void>();

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = (event) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    const vector = mapSpace
      .inverse()
      .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace));

    props.onMouseMove?.(vector);

    mouseMove.notify(vector);
  };

  const handleMouseDown: MouseEventHandler<SVGSVGElement> = (event) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    const vector = mapSpace
      .inverse()
      .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace));

    mouseDown.notify(vector);
  };

  const handleMouseUp: MouseEventHandler<SVGSVGElement> = (event) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    const vector = mapSpace
      .inverse()
      .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace));

    mouseUp.notify(vector);
  };

  const handleClick: MouseEventHandler<SVGSVGElement> = (event) => {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    const vector = mapSpace
      .inverse()
      .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace));

    props.onClick?.();
    click.notify(vector);
  };

  const contextValue: MapContextValue = {
    mapSpace,
    bounds,
    onMouseMove: mouseMove.on,
    onMouseDown: mouseDown.on,
    onMouseUp: mouseUp.on,
    onClick: click.on,
    openBakingPaper: set('portal'),
    closeBakingPaper: set('portal', null),
  };

  return (
    <Context.Provider value={contextValue}>
      <Container ref={divRef}>
        <ViewBox
          size={[s.width, s.height]}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
        >
          {typeof children === 'function' ? children(contextValue) : children}
        </ViewBox>

        <Transition.Fade active={!!s.portal} ms={200}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: s.width,
              height: s.height,
              backdropFilter: 'blur(7px)',
              pointerEvents: s.portal ? undefined : 'none',
            }}
          >
            {s.portal}
          </div>
        </Transition.Fade>
      </Container>
    </Context.Provider>
  );
};
