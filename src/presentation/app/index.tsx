import { FC } from 'react';

import { makeRouter } from '@main/factories/routes';

/**
 * Ponto de partida da aplicação.
 */
const App: FC = () => {
  return makeRouter();
};

export { App };
