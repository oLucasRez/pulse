import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';

export interface ISignInWithProviderUsecase {
  execute(provider: Provider): Promise<UserModel>;
}
