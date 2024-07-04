import styled from 'styled-components';

import { StyledSVG } from '@presentation/types';

export const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  > .IconButton.turn-back {
    position: absolute !important;
    left: 1rem;
    top: 1rem;
  }
`;

type ViewBoxProps = { size: [number, number] };
export const ViewBox: StyledSVG<ViewBoxProps> = styled.svg.attrs<ViewBoxProps>(
  (props) => ({
    viewBox: `0 0 ${props.size[0]} ${props.size[1]}`,
    xmlns: 'https://www.w3.org/2000/svg',
  }),
)``;

export const Children = styled.div`
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const ConfirmDialog = styled.div`
  position: absolute;
  padding: 2rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.background.light};
  ${({ theme }) => theme.elevation[1]}
  border-radius: 1rem;
  width: calc(100vw - 4rem);
  max-width: 20rem;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas:
    'text text'
    'no   yes';
  gap: 1rem;

  > .Button {
    height: auto;
  }

  > .Button:first-child {
    grid-area: no;
  }

  > .Button:last-child {
    grid-area: yes;
  }
`;

export const ConfirmText = styled.p`
  font-size: 1rem;
  text-align: center;
  grid-area: text;
`;
