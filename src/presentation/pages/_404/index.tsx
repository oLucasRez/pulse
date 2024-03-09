import { FC } from 'react';

import { Link } from '@presentation/components';

import { Container } from './styles';

const NotFoundPage: FC = () => {
  return (
    <Container>
      <h1>404 🫥</h1>
      <p>
        Page not found :(
        <br />
        Go back to <Link.toHome>home</Link.toHome>
      </p>
    </Container>
  );
};

export default NotFoundPage;
