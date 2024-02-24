import { StyledSVG } from '@presentation/types';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

type ViewBoxProps = { size: [number, number] };
export const ViewBox: StyledSVG<ViewBoxProps> = styled.svg.attrs<ViewBoxProps>(
  (props) => ({
    viewBox: `0 0 ${props.size[0]} ${props.size[1]}`,
    xmlns: 'https://www.w3.org/2000/svg',
  }),
)``;
