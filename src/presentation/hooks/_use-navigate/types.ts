export type NavigateHookReturn = {
  navigateToHome(): void;
  navigateToGame(id?: string): void;
  navigateToSubject(id?: string): void;
  navigateToCentralFact(): void;
  navigateToLogin(): void;
  navigateToRegister(): void;
  navigateToLogout(): void;
  reloadWindow(): void;
};
