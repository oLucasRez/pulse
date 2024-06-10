import {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { useStates } from '@presentation/hooks';

import { PProps } from './types';

export const P = forwardRef<HTMLParagraphElement, PProps>(function Text(
  { strokeWidth, stroke, ...props },
  ref,
) {
  function isInsideSVG(element: HTMLElement): boolean {
    let currentElement: HTMLElement | null = element;

    while (currentElement !== null) {
      if (currentElement.tagName.toLowerCase() === 'svg') {
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    return false;
  }

  const _ref = useRef<HTMLParagraphElement>(null);

  useImperativeHandle<HTMLParagraphElement | null, HTMLParagraphElement | null>(
    ref,
    () => _ref.current,
    [],
  );

  const [s] = useStates({
    isInsideSVG: false,
  });
  useEffect(() => {
    s.isInsideSVG = !!_ref.current && isInsideSVG(_ref.current);
  }, []);

  function wrapForeignObject(children: ReactElement) {
    if (s.isInsideSVG)
      return (
        <foreignObject
          x={0}
          y={0}
          width='100%'
          height='100%'
          pointerEvents='none'
        >
          {children}
        </foreignObject>
      );

    return children;
  }

  return wrapForeignObject(
    <>
      {!!strokeWidth && !!stroke && (
        <p
          {...props}
          style={{
            padding: `${strokeWidth}px`,
            ...props.style,
            WebkitTextStrokeWidth: strokeWidth * 2,
            WebkitTextStrokeColor: stroke,
          }}
        />
      )}
      <p
        ref={_ref}
        {...props}
        style={{
          padding: `${strokeWidth}px`,
          ...props.style,
        }}
      />
    </>,
  );
});
