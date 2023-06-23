import { faker } from '@faker-js/faker';

import { NotIntegerError } from '../not-integer';

describe('NotIntegerError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: faker.number.float(),
  };

  const defaultMessage = `{${validMetadata.prop}} must be integer`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an NotIntegerError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new NotIntegerError({ metadata });

      expect(error).toBeInstanceOf(NotIntegerError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an NotIntegerError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new NotIntegerError({ message, metadata });

      expect(error).toBeInstanceOf(NotIntegerError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
