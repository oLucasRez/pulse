import { forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';

import { PProps } from './types';

export const P = forwardRef<HTMLParagraphElement, PProps>(function Text(
  props,
  ref,
) {
  const { strokeWidth, stroke, ...rest } = props;

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

  function wrapForeignObject(children: ReactElement) {
    if (_ref.current && isInsideSVG(_ref.current))
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
          {...rest}
          style={{
            ...rest.style,
            WebkitTextStrokeWidth: strokeWidth * 2,
            WebkitTextStrokeColor: stroke,
          }}
        />
      )}
      <p ref={_ref} {...rest} />
    </>,
  );
});
