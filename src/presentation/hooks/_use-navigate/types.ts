import { ComponentProps } from 'react';
import { Link, Navigate } from 'react-router-dom';

export type LinkProps = ComponentProps<typeof Link>;
export type NavigateProps = ComponentProps<typeof Navigate>;

export type NavigateHookReturn = {
  navigateToHome(): void;
  navigateToGame(id: string): void;
  navigateToLogin(): void;
  navigateToRegister(): void;
  navigateToLogout(): void;
  reloadWindow(): void;

  linkToHomeProps: LinkProps;
  linkToLoginProps: LinkProps;
  linkToRegisterProps: LinkProps;

  navigateToHomeProps: NavigateProps;
  navigateToLoginProps: NavigateProps;
};
