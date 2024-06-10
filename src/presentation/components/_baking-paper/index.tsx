import { forwardRef, HTMLAttributes } from 'react';

import { Container } from './styles';

export const BakingPaper = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function BakingPaper(props, ref) {
  return <Container ref={ref} {...props} />;
});
