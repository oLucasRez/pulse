import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

export type LinkProps = Omit<ComponentProps<typeof Link>, 'to'>;

export interface LinkToGameProps extends LinkProps {
  id: string;
}
