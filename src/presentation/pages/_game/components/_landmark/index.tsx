import {
  CSSProperties,
  FC,
  PointerEvent,
  PointerEventHandler,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

import { Vector } from '@domain/utils';

import { P, Text, Transition } from '@presentation/components';
import { useLandmark, useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { beginPath } from '@presentation/utils';

import { LandmarkProps } from './types';

import { useMapContext } from '..';

const bottomRightDescriptionOffset = new Vector([-50, -50]);
const bottomLeftDescriptionOffset = new Vector([50, -50]);
const topRightDescriptionOffset = new Vector([-50, 50]);
const topLeftDescriptionOffset = new Vector([50, 50]);

const longPressMs = 500;
const tapTolerancePx = 10;

const lineClampStyle: CSSProperties = {
  color: 'inherit',
  fontFamily: 'inherit',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

export const Landmark: FC<LandmarkProps> = ({
  description,
  symbol,
  subtitle,
  subtitleItalic,
  subtitleColor,
  onClick,
  ...props
}) => {
  const [s] = useStates({
    active: false,
    landmarkAbove: null as HTMLElement | null,
  });

  const { landmarks } = useLandmark();
  const { mapSpace } = useMapContext();

  const transform = useMemo(() => {
    const samePosition = landmarks.filter(
      ({ position }) =>
        position &&
        props.position &&
        position.sub(props.position).mag() < 0.0001,
    );

    const i = samePosition.findIndex(({ id }) => id === props.id);
    const n = samePosition.length;

    let translate: Vector;

    if (n === 1) translate = new Vector([0, 0]);
    else if (n === 2) translate = new Vector([i === 0 ? -70 : 70, 0]);
    else translate = new Vector([0, 0]);

    return translate;
  }, [landmarks, props.position, props.id]);

  useEffect(() => {
    s.landmarkAbove = s.active
      ? document.getElementById('landmark-above')
      : null;
  }, [s.active]);

  const touchRef = useRef<{
    start: Vector;
    timeoutID?: ReturnType<typeof setTimeout>;
    longPressed: boolean;
  } | null>(null);

  const lastPointerTypeRef = useRef('mouse');

  function cancelLongPress() {
    clearTimeout(touchRef.current?.timeoutID);
    touchRef.current = null;
  }

  useEffect(() => cancelLongPress, []);

  useEffect(() => {
    if (!s.active || lastPointerTypeRef.current === 'mouse') return;

    const handleOutsidePointerDown = (event: Event) => {
      const target = event.target as Element | null;

      if (target?.closest?.(`[data-landmark="${props.id}"]`)) return;

      s.active = false;
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown, true);

    return () =>
      document.removeEventListener(
        'pointerdown',
        handleOutsidePointerDown,
        true,
      );
  }, [s.active, props.id]);

  const handlePointerEnter: PointerEventHandler = (event) => {
    if (event.pointerType === 'mouse') s.active = true;
  };

  const handlePointerLeave: PointerEventHandler = (event) => {
    if (event.pointerType === 'mouse') s.active = false;
  };

  const handlePointerDown: PointerEventHandler = (event) => {
    lastPointerTypeRef.current = event.pointerType;

    if (event.pointerType === 'mouse') return;

    cancelLongPress();

    const touch = {
      start: new Vector([event.clientX, event.clientY]),
      longPressed: false,
      timeoutID: undefined as ReturnType<typeof setTimeout> | undefined,
    };

    if (description && onClick)
      touch.timeoutID = setTimeout(() => {
        touch.longPressed = true;
        navigator.vibrate?.(20);
        onClick();
      }, longPressMs);

    touchRef.current = touch;
  };

  function movedTooFar(start: Vector, event: PointerEvent): boolean {
    return (
      start.sub(new Vector([event.clientX, event.clientY])).mag() >
      tapTolerancePx
    );
  }

  const handlePointerMove: PointerEventHandler = (event) => {
    if (event.pointerType === 'mouse') return;

    if (touchRef.current && movedTooFar(touchRef.current.start, event))
      cancelLongPress();
  };

  // A tap (or long press) on a landmark is consumed here, so it doesn't
  // confirm whatever action the map is waiting for.
  const handlePointerUp: PointerEventHandler = (event) => {
    if (event.pointerType === 'mouse') return;

    const touch = touchRef.current;

    cancelLongPress();

    if (!touch || movedTooFar(touch.start, event)) return;

    event.stopPropagation();

    if (!touch.longPressed) s.active = true;
  };

  const handleClick = () => {
    if (lastPointerTypeRef.current !== 'mouse') return;
    if (description) onClick?.();
  };

  if (!props.position) return null;

  const topRight =
    props.position && props.position.x >= 0 && props.position.y < 0;
  const topLeft =
    props.position && props.position.x < 0 && props.position.y < 0;
  const bottomRight =
    props.position && props.position.x >= 0 && props.position.y >= 0;
  const bottomLeft =
    props.position && props.position.x < 0 && props.position.y >= 0;

  const descriptionOffset = (() => {
    if (bottomRight) return bottomRightDescriptionOffset;
    if (bottomLeft) return bottomLeftDescriptionOffset;
    if (topRight) return topRightDescriptionOffset;
    if (topLeft) return topLeftDescriptionOffset;
    return new Vector([0, 0]);
  })();

  const position = mapSpace.mult(props.position);
  const descriptionPosition = position.sum(descriptionOffset);

  const color = getColor(props.color);

  function render() {
    return (
      <>
        <circle cx={position.x} cy={position.y} r={2} fill={color} />

        <Transition.Fade active={s.active && !!description} ms={200}>
          <g>
            <path
              // style
              fill='none'
              stroke={color}
              strokeWidth={2}
              strokeLinecap='round'
              // params
              d={beginPath()
                .moveTo(position)
                .bezierCurveTo(
                  descriptionOffset.projX().mult(0.5),
                  descriptionOffset.mult(new Vector([1, 0.5])),
                  descriptionOffset,
                )
                .toString()}
            />
            <circle
              // style
              fill={color}
              // params
              cx={descriptionPosition.x}
              cy={descriptionPosition.y}
              r={3}
            />
            <P
              // style
              className='handwriting'
              strokeWidth={3}
              stroke='white'
              style={{
                position: 'absolute',
                left: descriptionPosition.x,
                top: descriptionPosition.y,
                color,
                maxWidth: '17.5ch',
                lineHeight: 1.2,
                transform: `translateY(${
                  bottomLeft || bottomRight ? '-100%' : 0
                })`,
              }}
            >
              <span style={lineClampStyle}>{description}</span>
              {!!subtitle && (
                <span
                  style={{
                    ...lineClampStyle,
                    fontStyle: subtitleItalic ? 'italic' : undefined,
                    color: subtitleColor ? getColor(subtitleColor) : 'inherit',
                  }}
                >
                  {subtitle}
                </span>
              )}
            </P>
          </g>
        </Transition.Fade>

        <Transition.Scale active={s.active} activeFactor={1.3} ms={100}>
          <Text
            // style
            className='handwriting'
            textAnchor='middle'
            alignmentBaseline='middle'
            cursor='pointer'
            fill={color}
            stroke='white'
            strokeWidth={3}
            style={{
              transform: `translate(${transform.x}%, ${transform.y}%)`,
            }}
            // params
            x={position.x}
            y={position.y}
            data-landmark={props.id}
            // handle
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={cancelLongPress}
            onClick={handleClick}
          >
            {symbol}
          </Text>
        </Transition.Scale>
      </>
    );
  }

  if (!s.landmarkAbove) return render();

  return createPortal(render(), s.landmarkAbove);
};
