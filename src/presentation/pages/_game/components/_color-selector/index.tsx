import { FC, useEffect, useRef } from 'react';

import { Color } from '@domain/enums';

import { Popover, Ripple } from '@presentation/components';
import { useAvailableColors, useStates } from '@presentation/hooks';

import {
  ArrowIcon,
  ColorOption,
  Container,
  PopoverContent,
  SelectedColor,
} from './styles';

import { ColorSelectorProps } from './types';

export const ColorSelector: FC<ColorSelectorProps> = ({
  defaultValue,
  disabled,
  onChange,
}) => {
  const [s, set] = useStates({
    opened: false,
    selected: undefined as Color | undefined,
  });

  const ref = useRef<HTMLButtonElement>(null);

  const availableColors = useAvailableColors();

  useEffect(() => s.selected && onChange?.(s.selected), [s.selected]);

  useEffect(() => {
    if (!defaultValue || s.selected) return;
    s.selected = defaultValue;
  }, [defaultValue]);

  function handleClick() {
    s.opened = !s.opened;
  }

  return (
    <>
      <Ripple ref={ref}>
        <Container
          className='ColorSelector'
          $disabled={disabled}
          onClick={handleClick}
        >
          <SelectedColor $color={s.selected} />
          <ArrowIcon $opened={s.opened} />
        </Container>
      </Ripple>

      <Popover anchorRef={ref} onToggle={set('opened')}>
        <PopoverContent>
          {availableColors.map((color, i) => (
            <ColorOption
              key={i}
              $color={color}
              onClick={set('selected', color)}
            />
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};
