import { faker } from '@faker-js/faker';
import { FC, Fragment, useEffect, useRef } from 'react';

import { Popover, Ripple } from '@presentation/components';
import { useStates } from '@presentation/hooks';

import {
  AvatarOption,
  Container,
  PopoverContent,
  PopoverSection,
  PopoverSectionTitle,
} from './styles';

import { AvatarSelectorProps } from './types';

const avatars = {
  '🖐️': [
    ...['👶', '🧒', '👧', '👦', '🧑', '👩', '👨', '🧑‍🦱', '👩‍🦱', '👨‍🦱'],
    ...['🧑‍🦰', '👩‍🦰', '👨‍🦰', '👱', '👱‍♀️', '👱‍♂️', '🧑‍🦳', '👩‍🦳', '👨‍🦳', '🧑‍🦲'],
    ...['👩‍🦲', '👨‍🦲', '🧔', '🧔‍♀️', '🧔‍♂️', '🧓', '👵', '👴'],
  ],
  '🖐🏻': [
    ...['👶🏻', '🧒🏻', '👧🏻', '👦🏻', '🧑🏻', '👩🏻', '👨🏻', '🧑🏻‍🦱', '👩🏻‍🦱', '👨🏻‍🦱'],
    ...['🧑🏻‍🦰', '👩🏻‍🦰', '👨🏻‍🦰', '👱🏻', '👱🏻‍♀️', '👱🏻‍♂️', '🧑🏻‍🦳', '👩🏻‍🦳', '👨🏻‍🦳', '🧑🏻‍🦲'],
    ...['👩🏻‍🦲', '👨🏻‍🦲', '🧔🏻', '🧔🏻‍♀️', '🧔🏻‍♂️', '🧓🏻', '👵🏻', '👴🏻'],
  ],
  '🖐🏼': [
    ...['👶🏼', '🧒🏼', '👧🏼', '👦🏼', '🧑🏼', '👩🏼', '👨🏼', '🧑🏼‍🦱', '👩🏼‍🦱', '👨🏼‍🦱'],
    ...['🧑🏼‍🦰', '👩🏼‍🦰', '👨🏼‍🦰', '👱🏼', '👱🏼‍♀️', '👱🏼‍♂️', '🧑🏼‍🦳', '👩🏼‍🦳', '👨🏼‍🦳', '🧑🏼‍🦲'],
    ...['👩🏼‍🦲', '👨🏼‍🦲', '🧔🏼', '🧔🏼‍♀️', '🧔🏼‍♂️', '🧓🏼', '👵🏼', '👴🏼'],
  ],
  '🖐🏽': [
    ...['👶🏽', '🧒🏽', '👧🏽', '👦🏽', '🧑🏽', '👩🏽', '👨🏽', '🧑🏽‍🦱', '👩🏽‍🦱', '👨🏽‍🦱'],
    ...['🧑🏽‍🦰', '👩🏽‍🦰', '👨🏽‍🦰', '👱🏽', '👱🏽‍♀️', '👱🏽‍♂️', '🧑🏽‍🦳', '👩🏽‍🦳', '👨🏽‍🦳', '🧑🏽‍🦲'],
    ...['👩🏽‍🦲', '👨🏽‍🦲', '🧔🏽', '🧔🏽‍♀️', '🧔🏽‍♂️', '🧓🏽', '👵🏽', '👴🏽'],
  ],
  '🖐🏾': [
    ...['👶🏾', '🧒🏾', '👧🏾', '👦🏾', '🧑🏾', '👩🏾', '👨🏾', '🧑🏾‍🦱', '👩🏾‍🦱', '👨🏾‍🦱'],
    ...['🧑🏾‍🦰', '👩🏾‍🦰', '👨🏾‍🦰', '👱🏾', '👱🏾‍♀️', '👱🏾‍♂️', '🧑🏾‍🦳', '👩🏾‍🦳', '👨🏾‍🦳', '🧑🏾‍🦲'],
    ...['👩🏾‍🦲', '👨🏾‍🦲', '🧔🏾', '🧔🏾‍♀️', '🧔🏾‍♂️', '🧓🏾', '👵🏾', '👴🏾'],
  ],
  '🖐🏿': [
    ...['👶🏿', '🧒🏿', '👧🏿', '👦🏿', '🧑🏿', '👩🏿', '👨🏿', '🧑🏿‍🦱', '👩🏿‍🦱', '👨🏿‍🦱'],
    ...['🧑🏿‍🦰', '👩🏿‍🦰', '👨🏿‍🦰', '👱🏿', '👱🏿‍♀️', '👱🏿‍♂️', '🧑🏿‍🦳', '👩🏿‍🦳', '👨🏿‍🦳', '🧑🏿‍🦲'],
    ...['👩🏿‍🦲', '👨🏿‍🦲', '🧔🏿', '🧔🏿‍♀️', '🧔🏿‍♂️', '🧓🏿', '👵🏿', '👴🏿'],
  ],
};

export const AvatarSelector: FC<AvatarSelectorProps> = ({
  disabled,
  defaultValue,
  readOnly,
  onChange,
}) => {
  const [s, set] = useStates({
    opened: false,
    selected: faker.helpers.arrayElement(faker.helpers.objectValue(avatars)),
  });

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!defaultValue) return;
    s.selected = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (s.selected) onChange?.(s.selected);
  }, [s.selected]);

  return (
    <>
      <Ripple ref={ref}>
        <Container
          className='AvatarSelector'
          icon={s.selected}
          $disabled={disabled}
          $readOnly={readOnly}
        />
      </Ripple>
      <Popover anchorRef={ref} onToggle={set('opened')}>
        <PopoverContent>
          {Object.entries(avatars).map(([key, avatars]) => (
            <Fragment key={key}>
              <PopoverSectionTitle>{key}</PopoverSectionTitle>

              <PopoverSection>
                {avatars.map((avatar) => (
                  <AvatarOption key={avatar} onClick={set('selected', avatar)}>
                    {avatar}
                  </AvatarOption>
                ))}
              </PopoverSection>
            </Fragment>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
};
