import {
  createContext,
  forwardRef,
  MouseEventHandler,
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
  Children,
  ConfirmDialog,
  ConfirmText,
  Container,
  ViewBox,
} from './styles';

import { MapContextValue, MapProps } from './types';

const Context = createContext<MapContextValue>({
  mapSpace: VectorSpace.identity,
  bounds: { top: -0, left: -0, right: 0, bottom: 0 },
  limit: 0,
  onMouseMove: () => () => {},
  onMouseDown: () => () => {},
  onMouseUp: () => () => {},
  onClick: () => () => {},
});

export const useMapContext = (): MapContextValue => useContext(Context);

export const Map = forwardRef<MapContextValue, MapProps>(function Map(
  { children, outsideSVG, ...props },
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
    onMouseMove: mouseMove.on,
    onMouseDown: mouseDown.on,
    onMouseUp: mouseUp.on,
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

  if (s.deletingGame) return <GlobalLoading />;

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

export namespace Map {
  export type Ref = MapContextValue;
}
