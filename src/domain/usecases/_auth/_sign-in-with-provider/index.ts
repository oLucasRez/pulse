import { UserModel } from '@domain/models';

import { AuthProvider } from '@data/protocols';

export interface SignInWithProviderUsecase {
  execute(provider: AuthProvider): Promise<UserModel>;
}

export namespace SignInWithProviderUsecase {}
