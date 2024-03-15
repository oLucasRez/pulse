import styled from 'styled-components';

import { StyledSVG } from '@presentation/types';

export const Container = styled.div`
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

type ViewBoxProps = { size: [number, number] };
export const ViewBox: StyledSVG<ViewBoxProps> = styled.svg.attrs<ViewBoxProps>(
  (props) => ({
    viewBox: `0 0 ${props.size[0]} ${props.size[1]}`,
    xmlns: 'https://www.w3.org/2000/svg',
  }),
)``;
