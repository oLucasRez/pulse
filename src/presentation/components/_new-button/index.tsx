import { forwardRef } from 'react';

import { Container } from './styles';

import { ButtonProps } from './types';

import { Loading } from '../_loading';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ color, loading, size = 'medium', ...props }, ref) {
    const className = [props.className, 'Button'].filter((x) => x).join(' ');

    return (
      <Container
        ref={ref}
        $color={color}
        $size={size}
        {...props}
        disabled={props.disabled || loading}
        className={className}
      >
        {loading && <Loading />}
        {props.children}
      </Container>
    );
  },
);
