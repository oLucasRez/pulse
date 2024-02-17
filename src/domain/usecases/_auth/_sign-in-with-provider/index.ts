import { UserModel } from '@domain/models';

import { Provider } from '@domain/types';

export interface SignInWithProviderUsecase {
  execute(provider: Provider): Promise<UserModel>;
}
