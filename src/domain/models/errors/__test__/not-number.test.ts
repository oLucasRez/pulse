import { faker } from '@faker-js/faker';

import { NotNumberError } from '../not-number';

describe('NotNumberError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: faker.string.sample(),
  };

  const defaultMessage = `{${validMetadata.prop}} must be a number`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an NotNumberError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new NotNumberError({ metadata });

      expect(error).toBeInstanceOf(NotNumberError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an NotNumberError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new NotNumberError({ message, metadata });

      expect(error).toBeInstanceOf(NotNumberError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
