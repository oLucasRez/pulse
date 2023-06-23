import { faker } from '@faker-js/faker';

import { InvalidHTMLError } from '../invalid-html';

describe('InvalidHTMLError', () => {
  const validMetadata = {
    prop: faker.word.sample(),
    value: faker.string.sample(),
  };

  const defaultMessage = `{${validMetadata.prop}} HTML is invalid`;
  const validMessage = faker.lorem.sentence();

  describe('constructor', () => {
    it('should create an InvalidHTMLError instance with default message and metadata', () => {
      const metadata = validMetadata;

      const error = new InvalidHTMLError({ metadata });

      expect(error).toBeInstanceOf(InvalidHTMLError);
      expect(error.message).toBe(defaultMessage);
      expect(error.metadata).toEqual(metadata);
    });

    it('should create an InvalidHTMLError instance with the provided message and metadata', () => {
      const metadata = validMetadata;
      const message = validMessage;

      const error = new InvalidHTMLError({ message, metadata });

      expect(error).toBeInstanceOf(InvalidHTMLError);
      expect(error.message).toBe(message);
      expect(error.metadata).toEqual(metadata);
    });
  });
});
