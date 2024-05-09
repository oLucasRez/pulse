import { FC } from 'react';

import { useCreateAnswerToast, useVoteAnswerToast } from './hooks';

import {
  CentralFact,
  Dices,
  Map,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

export const CreatingAnswersState: FC = () => {
  useCreateAnswerToast();
  useVoteAnswerToast();

  return (
    <Map>
      <Pulses />
      <Dices transparent />
      <Subjects />
      <CentralFact />
      <Questions />
    </Map>
  );
};
