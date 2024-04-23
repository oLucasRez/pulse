import { FC } from 'react';

import {
  CentralFact,
  Dices,
  Map,
  PlayersList,
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

      <PlayersList />

      <p className='legend handwriting'>The game is over!!</p>
    </>
  );
};
