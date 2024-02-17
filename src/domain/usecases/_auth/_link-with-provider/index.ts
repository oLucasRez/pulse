import { UserModel } from '@domain/models';

import { Provider } from '@domain/types';

export interface LinkWithProviderUsecase {
  execute(provider: Provider): Promise<UserModel>;
}
