import { FC } from 'react';

import {
  CentralFact,
  Dices,
  Map,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

export const FinalState: FC = () => {
  return (
    <>
      <Map>
        <Pulses />
        <Dices transparent />
        <Subjects />
        <CentralFact />
        <Questions />
      </Map>

      <p className='legend handwriting'>The game is over!!</p>
    </>
  );
};
