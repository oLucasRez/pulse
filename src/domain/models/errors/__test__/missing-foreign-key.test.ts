import { faker } from '@faker-js/faker';

import { MissingForeignKeyError } from '../missing-foreign-key';

describe('MissingForeignKeyError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: faker.string.sample(),
  };

  const defaultMessage = `{${validMetadata.prop}} foreign key is missing`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an MissingForeignKeyError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new MissingForeignKeyError({ metadata });

      expect(error).toBeInstanceOf(MissingForeignKeyError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an MissingForeignKeyError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new MissingForeignKeyError({ message, metadata });

      expect(error).toBeInstanceOf(MissingForeignKeyError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
