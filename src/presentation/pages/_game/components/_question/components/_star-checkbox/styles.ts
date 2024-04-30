import { FaRegStar, FaStar } from 'react-icons/fa';
import styled, { css } from 'styled-components';

const styledStar = css`
  &:hover {
    transform: scale(1.2);
    transition: 0.1s;
  }
`;

export const CheckedStarIcon = styled(FaStar)`
  ${styledStar}
`;

export const UncheckedStarIcon = styled(FaRegStar)`
  ${styledStar}
`;
