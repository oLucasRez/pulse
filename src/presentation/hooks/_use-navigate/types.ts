export type Options = {
  replace?: boolean;
};

export type NavigateHookReturn = {
  navigateToHome(): void;
  navigateToGame(id?: string): void;
  navigateToPlayer(id?: string, options?: Options): void;
  navigateToSubject(id?: string): void;
  navigateToCentralFact(): void;
  navigateToInvestigation(id?: string): void;
  navigateToLogin(): void;
  navigateToRegister(): void;
  navigateToLogout(): void;
  reloadWindow(): void;
};
