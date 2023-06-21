import { faker } from '@faker-js/faker';

import { MissingForeignKeyError } from '@domain/errors';

import { CentralFact } from '../central-fact';

describe('CentralFact', () => {
  const validID = faker.string.uuid();

  const validRichTextID = faker.string.uuid();
  const missingRichTextID = '';

  const validCentralPulseID = faker.string.uuid();
  const missingCentralPulseID = '';

  const validCreatedAt = faker.date.recent().toISOString();
  const validUpdatedAt = faker.date.recent().toISOString();

  describe('create', () => {
    test('should create a CentralFact with only required props', () => {
      const richTextID = validRichTextID;
      const centralPulseID = validCentralPulseID;

      const centralFact = CentralFact.create({
        richTextID,
        centralPulseID,
      }).await();

      expect(centralFact.id).toBeDefined();
      expect(centralFact.richTextID).toBe(richTextID);
      expect(centralFact.centralPulseID).toBe(centralPulseID);
      expect(centralFact.createdAt).toBeDefined();
      expect(centralFact.updatedAt).toBeDefined();
    });

    test('should create a CentralFact with all props', () => {
      const id = validID;
      const richTextID = validRichTextID;
      const centralPulseID = validCentralPulseID;
      const createdAt = validCreatedAt;
      const updatedAt = validUpdatedAt;

      const centralFact = CentralFact.create({
        id,
        richTextID,
        centralPulseID,
        createdAt,
        updatedAt,
      }).await();

      expect(centralFact.id).toBe(id);
      expect(centralFact.richTextID).toBe(richTextID);
      expect(centralFact.centralPulseID).toBe(centralPulseID);
      expect(centralFact.createdAt).toBe(createdAt);
      expect(centralFact.updatedAt).toBe(updatedAt);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const richTextID = missingRichTextID;
      const centralPulseID = validCentralPulseID;

      const result = CentralFact.create({ richTextID, centralPulseID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if centralPulseID is missing', () => {
      const richTextID = validRichTextID;
      const centralPulseID = missingCentralPulseID;

      const result = CentralFact.create({ richTextID, centralPulseID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });
});
