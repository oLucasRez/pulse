import styled from 'styled-components';

import { pulseLogo } from '@presentation/assets';
import { lighten } from '@presentation/styles/mixins';

import { $BackgroundPatternProps } from './types';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: radial-gradient(${lighten('#D7D7E0', 0.1)}, #d7d7e0);
`;

export const PulseLogo = styled.img.attrs({ src: pulseLogo })`
  width: 20rem;
  margin-bottom: 2rem;
  z-index: 1;
`;

export const Version = styled.span`
  position: absolute;
  right: 1.5rem;
  bottom: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.foreground.light};
  z-index: 1;
`;

export const BackgroundPattern = styled.svg.attrs<$BackgroundPatternProps>(
  ({ $width, $height }) => ({
    viewBox: `0 0 ${$width} ${$height}`,
    xmlns: 'http://www.w3.org/2000/svg',
  }),
)<$BackgroundPatternProps>`
  position: absolute;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  inset: 0;
  margin: auto;
  overflow: visible;

  .filled {
    fill: ${lighten('#D7D7E0', 0.05)};
  }

  .outlined {
    fill: none;
    stroke: ${lighten('#D7D7E0', 0.05)};
  }
`;
