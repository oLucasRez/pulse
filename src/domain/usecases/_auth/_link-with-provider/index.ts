import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';

export interface ILinkWithProviderUsecase {
  execute(provider: Provider): Promise<UserModel>;
}
