import { faker } from '@faker-js/faker';

import { UserModel } from '@domain/models';

import { GetCurrentUserUsecase } from '@domain/usecases';

import { uuid } from '@domain/utils';

export class MockGetCurrentUserUsecase implements GetCurrentUserUsecase {
  public async execute(): Promise<UserModel | null> {
    return {
      id: uuid(),
      name: faker.person.fullName(),
    };
  }
}
