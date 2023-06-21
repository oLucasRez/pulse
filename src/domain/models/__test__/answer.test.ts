import { faker } from '@faker-js/faker';

import { MissingForeignKeyError } from '@domain/errors';

import { sleep } from '@utils';

import { Answer } from '../answer';

describe('Answer', () => {
  const validID = faker.string.uuid();

  const defaultIsFact = false;
  const validIsFact = faker.datatype.boolean();
  const otherValidIsFact = faker.datatype.boolean();

  const validRichTextID = faker.string.uuid();
  const missingRichTextID = '';

  const validQuestionID = faker.string.uuid();
  const missingQuestionID = '';

  const validCreatedAt = faker.date.recent().toISOString();
  const validUpdatedAt = faker.date.recent().toISOString();

  describe('create', () => {
    test('should create an Answer with only required props', () => {
      const richTextID = validRichTextID;
      const questionID = validQuestionID;

      const answer = Answer.create({ richTextID, questionID }).await();

      expect(answer.id).toBeDefined();
      expect(answer.isFact).toBe(defaultIsFact);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
      expect(answer.createdAt).toBeDefined();
      expect(answer.updatedAt).toBeDefined();
    });

    test('should create an Answer with all props', () => {
      const id = validID;
      const isFact = validIsFact;
      const richTextID = validRichTextID;
      const questionID = validQuestionID;
      const createdAt = validCreatedAt;
      const updatedAt = validUpdatedAt;

      const answer = Answer.create({
        id,
        isFact,
        richTextID,
        questionID,
        createdAt,
        updatedAt,
      }).await();

      expect(answer.id).toBe(id);
      expect(answer.isFact).toBe(isFact);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
      expect(answer.createdAt).toBe(createdAt);
      expect(answer.updatedAt).toBe(updatedAt);
    });

    test('should reject with MissingForeignKeyError if richTextID is missing', () => {
      const richTextID = missingRichTextID;
      const questionID = validQuestionID;

      const result = Answer.create({ richTextID, questionID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });

    test('should reject with MissingForeignKeyError if questionID is missing', () => {
      const richTextID = validRichTextID;
      const questionID = missingQuestionID;

      const result = Answer.create({ richTextID, questionID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    test('should update isFact when provided', async () => {
      const richTextID = validRichTextID;
      const questionID = validQuestionID;
      const oldIsFact = validIsFact;

      const answer = Answer.create({
        isFact: oldIsFact,
        richTextID,
        questionID,
      }).await();

      const newIsFact = otherValidIsFact;

      const oldUpdatedAt = answer.updatedAt;
      await sleep(100);

      answer.update({ isFact: newIsFact }).await();

      expect(answer.isFact).toBe(newIsFact);
      expect(answer.updatedAt).not.toBe(oldUpdatedAt);
    });

    test('should not update anything when no properties are provided', async () => {
      const isFact = validIsFact;
      const richTextID = validRichTextID;
      const questionID = validQuestionID;

      const answer = Answer.create({ isFact, richTextID, questionID }).await();

      const oldUpdatedAt = answer.updatedAt;
      await sleep(100);

      answer.update({}).await();

      expect(answer.isFact).toBe(isFact);
      expect(answer.richTextID).toBe(richTextID);
      expect(answer.questionID).toBe(questionID);
      expect(answer.updatedAt).toBe(oldUpdatedAt);
    });
  });
});
