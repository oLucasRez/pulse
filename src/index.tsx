import { createRoot } from 'react-dom/client';

import {
  EmptyStringError,
  NotIntegerError,
  NotPositiveError,
} from '@common/domain/errors';
import { Pulse } from '@pulse/domain/models';

import { App } from '@common/presentation/app';

const container = document.getElementById('app');

const result = Pulse.create({
  amount: 3,
  gap: 20,
  origin: [250, 250],
  subjectID: 'vasdfgaergbsdgn',
});

result
  .then((value) => {
    console.log(value);
  })
  .catch(NotIntegerError, (error) => {
    console.error(error.message);
  })
  .catch(NotPositiveError, (error) => {
    console.error(error.message);
  })
  .catch(EmptyStringError, (error) => {
    console.error(error.message);
  });

const root = createRoot(container);

root.render(<App />);
