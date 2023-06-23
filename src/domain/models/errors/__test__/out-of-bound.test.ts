import { faker } from '@faker-js/faker';

import { OutOfBoundError } from '../out-of-bound';

describe('OutOfBoundError', () => {
  const validMetadata: OutOfBoundError.Metadata = {
    prop: faker.word.sample(),
    value: faker.number.float(),
    bound: faker.datatype.boolean() ? 'above' : 'below',
    limit: faker.number.int(),
    unit: faker.word.noun(),
  };

  const defaultMessage = `{${validMetadata.prop}} is ${validMetadata.bound} ${
    validMetadata.limit
  }${validMetadata.unit ? ' ' + validMetadata.unit : ''}`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an OutOfBoundError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new OutOfBoundError({ metadata });

      expect(error).toBeInstanceOf(OutOfBoundError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an OutOfBoundError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new OutOfBoundError({ message, metadata });

      expect(error).toBeInstanceOf(OutOfBoundError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
