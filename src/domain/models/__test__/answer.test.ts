import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { Answer } from '../answer';

describe('Answer', () => {
  const richTextID = uuid();
  const questionID = uuid();

  describe('create', () => {
    test('should create an Answer with valid props', () => {
      const answer = Answer.create({ richTextID, questionID }).await();

      expect(answer.id).toBeDefined();
      expect(answer.isFact).toBe(false);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const result = Answer.create({ richTextID: '', questionID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if questionID is missing', () => {
      const result = Answer.create({ richTextID, questionID: '' });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    test('should update isFact when provided', () => {
      const answer = Answer.create({ richTextID, questionID }).await();

      const newIsFact = true;

      answer.update({ isFact: newIsFact }).await();

      expect(answer.isFact).toBe(newIsFact);
    });

    test('should not update anything when no valid properties are provided', () => {
      const answer = Answer.create({ richTextID, questionID }).await();

      answer.update({}).await();

      expect(answer.isFact).toBe(false);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
    });
  });
});
