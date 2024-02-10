import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

export type LinkProps = ComponentProps<typeof Link>;

export type NavigateHookReturn = {
  navigateToHome(): void;
  navigateToGame(id: string): void;
  navigateToLogin(): void;
  navigateToLogout(): void;

  linkToHomeProps: LinkProps;
};
