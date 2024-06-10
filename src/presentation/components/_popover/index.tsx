import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useStates } from '@presentation/hooks';

import { ClickAway, Container } from './styles';

import { PopoverProps } from './types';

export const Popover: FC<PopoverProps> = ({
  anchorRef,
  children,
  onToggle,
}) => {
  const [s, set] = useStates({
    left: 0,
    top: 0,
    active: false,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (s.active) return;

    const handleClick = (event: any) => {
      event.stopPropagation();

      const target = event.currentTarget as HTMLElement;

      const clientRect = target.getBoundingClientRect();

      const { left, bottom, width } = clientRect;

      s.left = left + width / 2;
      s.top = bottom + 3;

      s.active = true;
    };

    anchorRef.current?.addEventListener('click', handleClick);
    return () => anchorRef.current?.removeEventListener('click', handleClick);
  }, [s.active]);

  useEffect(() => onToggle?.(s.active), [s.active]);

  if (!s.active) return null;

  return createPortal(
    <>
      <ClickAway onClick={set('active', false)} />

      <Container
        ref={ref}
        $left={s.left}
        $top={s.top}
        onMouseLeave={set('active', false)}
      >
        {children}
      </Container>
    </>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('popover')!,
  );
};
