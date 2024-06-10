import { FC } from 'react';

import { Container } from './styles';

import { Loading } from '../_loading';

export const GlobalLoading: FC = () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
};
