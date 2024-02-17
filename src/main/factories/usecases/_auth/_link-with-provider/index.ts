import { LinkWithProviderUsecase } from '@domain/usecases';

import { makeAuthLinkWithProviderUsecase } from './auth';

export function makeLinkWithProviderUsecase(): LinkWithProviderUsecase {
  return makeAuthLinkWithProviderUsecase();
}
