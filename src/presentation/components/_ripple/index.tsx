import {
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { RippleProps } from './types';

export const Ripple = forwardRef<HTMLElement, RippleProps>(function Ripple(
  { children },
  outerRef,
) {
  const innerRef = useRef<HTMLElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useImperativeHandle(outerRef, () => innerRef.current!, []);

  useEffect(() => {
    innerRef.current?.addEventListener('click', (event: any) => {
      const ripple = document.createElement('span');

      ripple.classList.add('ripple');

      innerRef.current?.appendChild(ripple);

      const x = event.clientX - event.currentTarget.offsetLeft;
      const y = event.clientY - event.currentTarget.offsetTop;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      setTimeout(() => ripple.remove(), 300);
    });
  }, []);

  return cloneElement(children, {
    ref: innerRef,
    style: { position: 'relative', overflow: 'hidden' },
  });
});
