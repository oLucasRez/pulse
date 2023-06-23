import { faker } from '@faker-js/faker';

import { NotPositiveError } from '../not-positive';

describe('NotPositiveError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: -faker.number.float(),
  };

  const defaultMessage = `{${validMetadata.prop}} must be positive`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an NotPositiveError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new NotPositiveError({ metadata });

      expect(error).toBeInstanceOf(NotPositiveError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an NotPositiveError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new NotPositiveError({ message, metadata });

      expect(error).toBeInstanceOf(NotPositiveError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
