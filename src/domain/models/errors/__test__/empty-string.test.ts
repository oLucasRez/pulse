import { faker } from '@faker-js/faker';

import { EmptyStringError } from '../empty-string';

describe('EmptyStringError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: faker.string.sample(),
  };

  const defaultMessage = `{${validMetadata.prop}} is empty`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an EmptyStringError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new EmptyStringError({ metadata });

      expect(error).toBeInstanceOf(EmptyStringError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an EmptyStringError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new EmptyStringError({ message, metadata });

      expect(error).toBeInstanceOf(EmptyStringError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
