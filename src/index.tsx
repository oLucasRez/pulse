import { createRoot } from 'react-dom/client';

import { App } from '@presentation/app';

const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
