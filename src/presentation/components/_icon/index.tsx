import { ComponentProps, FC } from 'react';
import { IconType } from 'react-icons';
import { BsGearFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaArrowTurnUp, FaCopy, FaPencil, FaPlus } from 'react-icons/fa6';
import { ImBlocked } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import { useTheme } from 'styled-components';

import { IconProps } from './types';

function useIconProps({ color }: IconProps): ComponentProps<IconType> {
  const theme = useTheme();

  return {
    fill: color === 'error' ? theme.error.normal : theme.foreground.normal,
    className: 'Icon',
  };
}

const Pencil: FC<IconProps> = (props) => <FaPencil {...useIconProps(props)} />;

const Copy: FC<IconProps> = (props) => <FaCopy {...useIconProps(props)} />;

const TurnBack: FC<IconProps> = (props) => {
  const iconProps = useIconProps(props);

  return (
    <FaArrowTurnUp
      {...iconProps}
      style={{ ...iconProps.style, transform: 'rotate(-90deg)' }}
    />
  );
};

const Options: FC<IconProps> = (props) => (
  <BsThreeDotsVertical {...useIconProps(props)} />
);

const Gear: FC<IconProps> = (props) => <BsGearFill {...useIconProps(props)} />;

const Block: FC<IconProps> = (props) => <ImBlocked {...useIconProps(props)} />;

const Close: FC<IconProps> = (props) => {
  const iconProps = useIconProps(props);

  return (
    <IoClose {...iconProps} style={{ ...iconProps.style, fontSize: '1.5em' }} />
  );
};

const Plus: FC<IconProps> = (props) => <FaPlus {...useIconProps(props)} />;

export const Icon = {
  Pencil,
  Copy,
  TurnBack,
  Options,
  Gear,
  Block,
  Close,
  Plus,
};
