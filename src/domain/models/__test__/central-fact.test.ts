import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { CentralFact } from '../central-fact';

describe('CentralFact', () => {
  const richTextID = uuid();
  const centralPulseID = uuid();

  describe('create', () => {
    test('should create a CentralFact with valid props', () => {
      const centralFact = CentralFact.create({
        richTextID,
        centralPulseID,
      }).await();

      expect(centralFact.id).toBeDefined();
      expect(centralFact.richTextID).toBe(richTextID);
      expect(centralFact.centralPulseID).toBe(centralPulseID);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const result = CentralFact.create({ richTextID: '', centralPulseID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if centralPulseID is missing', () => {
      const result = CentralFact.create({ richTextID, centralPulseID: '' });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });
});
