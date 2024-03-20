import { createRoot } from 'react-dom/client';

import { makeApp } from '@main/factories';

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(makeApp());
}
