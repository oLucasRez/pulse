import {
  createContext,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  PointerEventHandler,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Outlet } from 'react-router-dom';

import { Vector, VectorSpace } from '@domain/utils';

import {
  Button,
  GlobalLoading,
  Icon,
  IconButton,
} from '@presentation/components';
import { ms } from '@presentation/constants';
import {
  useDice,
  useEvent,
  useGame,
  useInterval,
  useNavigate,
  usePlayer,
  useStates,
  useToast,
} from '@presentation/hooks';

import {
  AnchoredOverlay,
  Children,
  ConfirmDialog,
  ConfirmText,
  Container,
  Overlay,
  ViewBox,
} from './styles';

import { MapContextValue, MapProps } from './types';

const overlayAnchorFlipMargin = 96;
const overlayAnchorEdgeMargin = 64;

const Context = createContext<MapContextValue>({
  mapSpace: VectorSpace.identity,
  bounds: { top: -0, left: -0, right: 0, bottom: 0 },
  limit: 0,
  width: 0,
  height: 0,
  onPointerMove: () => () => {},
  onPointerDown: () => () => {},
  onPointerUp: () => () => {},
  onClick: () => () => {},
});

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map = forwardRef<MapContextValue, MapProps>(function Map(
  { children, outsideSVG, overlay, overlayAnchor, ...props },
  ref,
) {
  const [s, set] = useStates({
    width: 0,
    height: 0,
    confirmDialogIsOpen: false,
    deletingGame: false,
  });

  const divRef = useRef<HTMLDivElement>(null);

  function updateSize() {
    s.width = divRef.current?.clientWidth ?? 0;
    s.height = divRef.current?.clientHeight ?? 0;
  }

  useInterval(updateSize, 100 * ms, [], { firstShot: true });

  const { dices } = useDice();

  const limit = useMemo(
    () =>
      dices.reduce(
        (limit, dice) =>
          dice.ownerID && dice.sides > limit ? dice.sides : limit,
        0,
      ) + 1,
    [dices],
  );

  const bounds = { top: -limit, left: -limit, right: limit, bottom: limit };

  const mapSpace = useMemo(
    () =>
      new VectorSpace({
        translate: new Vector([s.width / 2, s.height / 2]),
        scale: Math.min(s.width, s.height) / (bounds.right - bounds.left),
      }),
    [s.width, s.height],
  );

  const pointerMove = useEvent<(pointer: Vector) => void>();
  const pointerDown = useEvent<(pointer: Vector) => void>();
  const pointerUp = useEvent<(pointer: Vector) => void>();
  const click = useEvent<(pointer: Vector) => void>();

  const pointerTypeRef = useRef('mouse');

  function toWorld(event: MouseEvent<SVGSVGElement>): Vector {
    const { x, y } = event.currentTarget.getBoundingClientRect();

    return mapSpace
      .inverse()
      .mult(new Vector([event.clientX - x, event.clientY - y], mapSpace));
  }

  function notifyMove(vector: Vector, pointerType: string) {
    props.onPointerMove?.({ position: vector, pointerType });
    pointerMove.notify(vector);
  }

  function notifyClick(vector: Vector, pointerType: string) {
    props.onClick?.({ position: vector, pointerType });
    click.notify(vector);
  }

  // Touch has no hover: a touch starts "hovering" on pointer down and
  // confirms (clicks) on pointer up, so dragging previews and releasing sets.
  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (event) => {
    if (!event.isPrimary) return;

    notifyMove(toWorld(event), event.pointerType);
  };

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (event) => {
    if (!event.isPrimary) return;

    pointerTypeRef.current = event.pointerType;

    const vector = toWorld(event);

    if (event.pointerType !== 'mouse') notifyMove(vector, event.pointerType);

    pointerDown.notify(vector);
  };

  const handlePointerUp: PointerEventHandler<SVGSVGElement> = (event) => {
    if (!event.isPrimary) return;

    const vector = toWorld(event);

    pointerUp.notify(vector);

    if (event.pointerType !== 'mouse') notifyClick(vector, event.pointerType);
  };

  const handleClick: MouseEventHandler<SVGSVGElement> = (event) => {
    if (pointerTypeRef.current !== 'mouse') return;

    notifyClick(toWorld(event), 'mouse');
  };

  const handleContextMenu: MouseEventHandler<SVGSVGElement> = (event) => {
    if (pointerTypeRef.current !== 'mouse') event.preventDefault();
  };

  const { imHost, currentGame, deleteGame } = useGame();
  const { navigateToHome } = useNavigate();
  const toast = useToast();

  function handleTurnBackButtonClick() {
    if (!imHost) return navigateToHome();

    s.confirmDialogIsOpen = true;
  }

  function handleConfirmDeleteGameButtonClick() {
    if (currentGame) {
      s.deletingGame = true;

      deleteGame(currentGame.id)
        .catch(toast.error)
        .finally(navigateToHome)
        .finally(set('deletingGame', false));
    }
  }

  const { myPlayer } = usePlayer();

  const contextValue: MapContextValue = {
    mapSpace,
    bounds,
    limit,
    width: s.width,
    height: s.height,
    onPointerMove: pointerMove.on,
    onPointerDown: pointerDown.on,
    onPointerUp: pointerUp.on,
    onClick: click.on,
  };

  useImperativeHandle(ref, () => contextValue, []);

  function renderOutside() {
    const border = Math.min(s.width, s.height) / 2;
    const min = Math.min(s.width, s.height);

    return (
      <path
        d={`M${s.width / 2} 0 h${s.width / 2} v${
          s.height
        } h${-s.width} v${-s.height} h${s.width / 2} v${
          s.width > s.height ? 0 : (s.height - s.width) / 2
        } a${border} ${border} 0 0 0 0 ${min} a${border} ${border} 0 0 0 0 ${-min}`}
        fill='darkgrey'
        opacity={0.1}
      />
    );
  }

  function renderOverlay() {
    if (!overlayAnchor) return <Overlay>{overlay}</Overlay>;

    const { x, y } = mapSpace.mult(overlayAnchor);
    const above = y > s.height - overlayAnchorFlipMargin;

    return (
      <AnchoredOverlay
        style={{
          left: `clamp(${overlayAnchorEdgeMargin}px, ${x}px, calc(100% - ${overlayAnchorEdgeMargin}px))`,
          top: y,
        }}
        $above={above}
      >
        {overlay}
      </AnchoredOverlay>
    );
  }

  if (s.deletingGame) return <GlobalLoading />;

  return (
    <Context.Provider value={contextValue}>
      <Container ref={divRef}>
        <ViewBox
          size={[s.width, s.height]}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {renderOutside()}
          {!outsideSVG &&
            (typeof children === 'function'
              ? children(contextValue)
              : children)}

          <g id='landmark-above' />
        </ViewBox>

        {outsideSVG && (
          <Children>
            {typeof children === 'function' ? children(contextValue) : children}
          </Children>
        )}

        {overlay && renderOverlay()}

        <IconButton
          className='turn-back'
          icon={<Icon.TurnBack />}
          onClick={handleTurnBackButtonClick}
        />

        {s.confirmDialogIsOpen && (
          <ConfirmDialog>
            <ConfirmText>
              Tem certeza que deseja sair? O jogo será excluído permanentemente!
            </ConfirmText>

            <Button onClick={set('confirmDialogIsOpen', false)}>
              Não, ficar aqui
            </Button>
            <Button
              onClick={handleConfirmDeleteGameButtonClick}
              color={myPlayer?.color}
            >
              Sim, sair
            </Button>
          </ConfirmDialog>
        )}

        <Outlet />
      </Container>
    </Context.Provider>
  );
});

export { MapPointerEvent } from './types';

export namespace Map {
  export type Ref = MapContextValue;
}
