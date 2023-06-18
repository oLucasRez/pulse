import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { Answer } from '../answer';

describe('Answer', () => {
  const richTextID = uuid();
  const questionID = uuid();

  describe('create', () => {
    test('should create an Answer with isFact false by default, valid richTextID and questionID', () => {
      const result = Answer.create({
        richTextID,
        questionID,
      });

      expect(result.resolved).toBe(true);

      const answer = result.await();

      expect(answer.isFact).toBe(false);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const result = Answer.create({
        richTextID: undefined,
        questionID,
      });

      expect(result.rejected).toBe(true);
      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if questionID is missing', () => {
      const result = Answer.create({
        richTextID,
        questionID: undefined,
      });

      expect(result.rejected).toBe(true);
      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    const initialAnswer = Answer.create({
      richTextID,
      questionID,
    }).await();

    test('should update isFact when isFact is provided', () => {
      const newIsFact = true;
      const result = initialAnswer.update({ isFact: newIsFact });

      expect(result.resolved).toBe(true);

      const updatedAnswer = result.await();

      expect(updatedAnswer.isFact).toBe(newIsFact);
      expect(updatedAnswer.richTextID).toBe(initialAnswer.richTextID);
      expect(updatedAnswer.questionID).toBe(initialAnswer.questionID);
    });

    test('should not update anything when no valid properties are provided', () => {
      const result = initialAnswer.update({});

      expect(result.resolved).toBe(true);

      const updatedAnswer = result.await();

      expect(updatedAnswer.isFact).toBe(initialAnswer.isFact);
      expect(updatedAnswer.richTextID).toBe(initialAnswer.richTextID);
      expect(updatedAnswer.questionID).toBe(initialAnswer.questionID);
    });
  });
});
