import { faker } from '@faker-js/faker';

import { DomainError } from '../domain';

describe('DomainError', () => {
  const defaultMessage = 'Unexpected error';
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create a DomainError instance with default message', () => {
      const error = new DomainError();

      expect(error).toBeInstanceOf(DomainError);
      expect(error.message).toBe(defaultMessage);
    });

    it('should create a DomainError instance with the provided message', () => {
      const message = validMessage;

      const error = new DomainError({ message });

      expect(error).toBeInstanceOf(DomainError);
      expect(error.message).toBe(validMessage);
    });
  });
});
