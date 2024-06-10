import { FC } from 'react';

import { Input, Sheet } from '@presentation/components';

import { Container } from './styles';

import { SettingsSheetProps } from './types';

export const SettingsSheet: FC<SettingsSheetProps> = ({ open, onClose }) => {
  return (
    <Sheet open={open} onClose={onClose} title='Configurações'>
      <Container>
        <Input label='Título' placeholder='Escreva...' />
        <Input
          label='Máx. de jogadores'
          placeholder='Escreva...'
          type='range'
          min={3}
          max={5}
          step={1}
        />
      </Container>
    </Sheet>
  );
};
