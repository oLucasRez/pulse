import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { CentralFact } from '../central-fact';

describe('CentralFact', () => {
  const richTextID = uuid();
  const centralPulseID = uuid();

  describe('create', () => {
    test('should create a CentralFact with valid richTextID', () => {
      const result = CentralFact.create({
        richTextID,
        centralPulseID,
      });

      expect(result.resolved).toBe(true);

      const answer = result.await();

      expect(answer.richTextID).toBe(richTextID);
      expect(answer.centralPulseID).toBe(centralPulseID);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const result = CentralFact.create({
        richTextID: undefined,
        centralPulseID,
      });

      expect(result.rejected).toBe(true);
      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if centralPulseID is missing', () => {
      const result = CentralFact.create({
        richTextID,
        centralPulseID: undefined,
      });

      expect(result.rejected).toBe(true);
      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });
});
