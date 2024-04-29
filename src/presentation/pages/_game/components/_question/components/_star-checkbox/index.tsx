import { FC } from 'react';

import { getColor } from '@presentation/styles/mixins';

import { CheckedStarIcon, UncheckedStarIcon } from './styles';

import { StarCheckboxProps } from './types';

export const StarCheckbox: FC<StarCheckboxProps> = ({
  checked,
  expired,
  color,
  onCheck,
}) => {
  if (checked)
    return (
      <CheckedStarIcon
        onClick={expired ? onCheck : undefined}
        style={{
          fontSize: '1.25rem',
          fill: getColor(color),
          cursor: 'pointer',
          fillOpacity: expired ? 0.3 : 1,
        }}
      />
    );

  return (
    <UncheckedStarIcon
      onClick={onCheck}
      style={{
        fontSize: '1.25rem',
        fill: getColor(color),
        cursor: 'pointer',
      }}
    />
  );
};
