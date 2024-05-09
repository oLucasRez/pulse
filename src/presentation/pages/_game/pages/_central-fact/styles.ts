import styled from 'styled-components';

import { Input } from '@presentation/components';
import { getColor } from '@presentation/styles/mixins';

export const Content = styled.div`
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 3rem;
  max-width: 40rem;
`;

export const Label = styled.label.attrs({ className: 'handwriting' })`
  opacity: 0.75;
  width: max-content;
`;

export const Description = styled(Input)`
  font-size: 1.5rem;
  color: ${getColor()};
`;
