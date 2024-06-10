import { forwardRef } from 'react';

import { Container } from './styles';

import { IconButtonProps } from './types';

import { Loading } from '../_loading';
import { Ripple } from '../_ripple';

export const IconButton = forwardRef<IconButton.Element, IconButtonProps>(
  function IconButton(
    { icon, size = 'medium', onClick, loading, ...props },
    ref,
  ) {
    const className = [props.className, 'IconButton']
      .filter((x) => x)
      .join(' ');

    return (
      <Ripple ref={ref}>
        <Container className={className} onClick={onClick} $size={size}>
          {loading ? <Loading /> : icon}
        </Container>
      </Ripple>
    );
  },
);

export namespace IconButton {
  export type Element = HTMLButtonElement;
}
