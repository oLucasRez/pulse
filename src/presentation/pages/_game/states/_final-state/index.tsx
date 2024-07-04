import { FC, useEffect } from 'react';

import { useToast } from '@presentation/hooks';

import {
  CentralFact,
  Dices,
  Map,
  Pulses,
  Questions,
  Round,
  Subjects,
} from '../../components';

export const FinalState: FC = () => {
  const toast = useToast();
  useEffect(() => {
    toast.fire('notification', {
      title: 'Fim de jogo',
      description: 'Obrigado por jogar!',
    });
  }, []);

  return (
    <Map>
      <Pulses />
      <Dices transparent />
      <Subjects />
      <CentralFact />
      <Questions />
      <Round />
    </Map>
  );
};
