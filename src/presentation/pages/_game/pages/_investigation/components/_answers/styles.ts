import { FaStar } from 'react-icons/fa';
import styled, { css } from 'styled-components';

import { Input, P } from '@presentation/components';
import { getColor } from '@presentation/styles/mixins';

import {
  $AuthorProps,
  $DescriptionInputProps,
  $StarCheckboxProps,
  $VoteProps,
} from './types';

export const Label = styled.label.attrs({
  className: 'handwriting',
})`
  font-size: 0.75rem;
  opacity: 0.75;
  width: max-content;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: max-content auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    'star description description'
    'star votes       author';
  column-gap: 0.5rem;
  row-gap: 0.25rem;
`;

export const StarCheckbox = styled(FaStar)<$StarCheckboxProps>`
  grid-area: star;
  font-size: 1.5rem;
  stroke-width: 40;
  stroke: ${({ $color }) => getColor($color)};
  margin-top: 0.125rem;
  transition: 0.1s;
  cursor: pointer;
  fill: ${({ $checked, $color }) => ($checked ? getColor($color) : 'none')};
  fill-opacity: ${({ $expired }) => ($expired ? 0.25 : 1)};

  &:hover {
    transform: scale(1.1);
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}

  ${({ $checked, $expired }) =>
    $checked &&
    !$expired &&
    css`
      pointer-events: none;
    `}
`;

export const DescriptionInput = styled(Input).attrs<$DescriptionInputProps>(
  ({ $color }) =>
    ({
      variant: 'baking-paper',
      placeholderOpacity: 0.5,
      placeholderColor: getColor($color),
    } satisfies Input.Props),
)<$DescriptionInputProps>`
  grid-area: description;
  color: ${({ $color }) => getColor($color)};
  width: fit-content;

  ${({ $fact, $color }) =>
    $fact &&
    css`
      border: 2px solid ${getColor($color)}88;
      border-radius: 50%;
      padding: 0.5rem 1rem;
      margin: -0.5rem -1rem;
    `}
`;

export const Description = styled(P).attrs({
  className: 'handwriting',
})`
  grid-area: description;
  color: ${getColor()};
  font-style: italic;
  font-size: 0.875rem;
  margin-top: 0.325rem;
`;

export const Votes = styled.div`
  grid-area: votes;
  display: flex;
  gap: 0.5rem;
`;

export const Vote = styled.div<$VoteProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50rem;
  background: ${({ $color }) => getColor($color)};
`;

export const Author = styled.span.attrs({
  className: 'handwriting',
})<$AuthorProps>`
  grid-area: author;
  color: ${({ $color }) => getColor($color)};
  font-style: italic;
  font-size: 0.75rem;
  line-height: 1;
  text-align: end;
`;
