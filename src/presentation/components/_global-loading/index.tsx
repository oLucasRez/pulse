import { FC } from 'react';

import { Container } from './styles';

export const GlobalLoading: FC = () => {
  return (
    <Container>
      <span className='emoji loading'>⏳</span>
    </Container>
  );
};
