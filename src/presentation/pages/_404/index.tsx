import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from '@presentation/hooks';

import { Container } from './styles';

const NotFoundPage: FC = () => {
  const { linkToHomeProps } = useNavigate();

  return (
    <Container>
      <h1>404 🫥</h1>
      <p>
        Page not found :(
        <br />
        Go back to <Link {...linkToHomeProps}>home</Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;
