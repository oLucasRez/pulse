export type NavigateHookReturn = {
  navigateToHome(): void;
  navigateToGame(id: string): void;
  navigateToLogin(): void;
  navigateToRegister(): void;
  navigateToLogout(): void;
  reloadWindow(): void;
};
