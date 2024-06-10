import { FC } from 'react';
import { createPortal } from 'react-dom';

import { Body, Container, Header, Wrapper } from './styles';

import { SheetProps } from './types';

import { Icon } from '../_icon';
import { IconButton } from '../_icon-button';

export const Sheet: FC<SheetProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return createPortal(
    <Wrapper>
      <Container>
        {!!title && <Header>{title}</Header>}
        {onClose && (
          <IconButton icon={<Icon.Close />} size='small' onClick={onClose} />
        )}
        {!!children && <Body>{children}</Body>}
      </Container>
    </Wrapper>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('sheet')!,
  );
};
