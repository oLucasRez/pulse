import { forwardRef } from 'react';

import { Container } from './styles';

import { ButtonProps } from './types';

import { Loading } from '../_loading';
import { Ripple } from '../_ripple';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ color, disabled, loading, ...props }, ref) {
    const className = [props.className, 'Button'].filter((x) => x).join(' ');

    return (
      <Ripple ref={ref}>
        <Container
          $color={color}
          $disabled={disabled}
          {...props}
          className={className}
        >
          {loading && <Loading />}
          {props.children}
        </Container>
      </Ripple>
    );
  },
);
