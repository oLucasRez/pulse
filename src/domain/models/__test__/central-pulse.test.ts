import { faker } from '@faker-js/faker';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
} from '@domain/errors';

import { sleep } from '@utils/sleep';

import { CentralPulse } from '../central-pulse';

describe('CentralPulse', () => {
  const validID = faker.string.uuid();

  const defaultGap = 1;

  const validAmount = faker.number.int();
  const otherValidAmount = faker.number.int();
  const notPositiveAmount = -faker.number.int({ min: 1 });
  const notIntegerAmount = faker.number.float();

  const validGameID = faker.string.uuid();
  const missingGameID = '';

  const validCreatedAt = faker.date.recent().toISOString();
  const validUpdatedAt = faker.date.recent().toISOString();

  describe('create', () => {
    test('should create a CentralPulse with only required props', () => {
      const amount = validAmount;
      const gameID = validGameID;

      const centralPulse = CentralPulse.create({ amount, gameID }).await();

      expect(centralPulse.id).toBeDefined();
      expect(centralPulse.gap).toBe(defaultGap);
      expect(centralPulse.amount).toBe(amount);
      expect(centralPulse.gameID).toBe(gameID);
      expect(centralPulse.createdAt).toBeDefined();
      expect(centralPulse.updatedAt).toBeDefined();
    });

    test('should create a CentralPulse with all props', () => {
      const id = validID;
      const amount = validAmount;
      const gameID = validGameID;
      const createdAt = validCreatedAt;
      const updatedAt = validUpdatedAt;

      const centralPulse = CentralPulse.create({
        id,
        amount,
        gameID,
        createdAt,
        updatedAt,
      }).await();

      expect(centralPulse.id).toBe(id);
      expect(centralPulse.gap).toBe(defaultGap);
      expect(centralPulse.amount).toBe(amount);
      expect(centralPulse.gameID).toBe(gameID);
      expect(centralPulse.createdAt).toBe(createdAt);
      expect(centralPulse.updatedAt).toBe(updatedAt);
    });

    test('should reject with NotPositiveError if amount is not a positive number', () => {
      const amount = notPositiveAmount;
      const gameID = validGameID;

      const result = CentralPulse.create({ amount, gameID });

      expect(() => result.await()).toThrow(NotPositiveError);
    });

    test('should reject with NotIntegerError if amount is not an integer', () => {
      const amount = notIntegerAmount;
      const gameID = validGameID;

      const result = CentralPulse.create({ amount, gameID });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with MissingForeignKeyError if gameID is missing', () => {
      const amount = validAmount;
      const gameID = missingGameID;

      const result = CentralPulse.create({ amount, gameID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    test('should update amount when provided', async () => {
      const oldAmount = validAmount;
      const gameID = validGameID;

      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = otherValidAmount;

      const oldUpdatedAt = centralPulse.updatedAt;
      await sleep(100);

      centralPulse.update({ amount: newAmount }).await();

      expect(centralPulse.amount).toBe(newAmount);
      expect(centralPulse.updatedAt).not.toBe(oldUpdatedAt);
    });

    test('should reject with NotPositiveError if the new amount is not a positive number', async () => {
      const oldAmount = validAmount;
      const gameID = validGameID;

      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = notPositiveAmount;

      const oldUpdatedAt = centralPulse.updatedAt;
      await sleep(100);

      const result = centralPulse.update({ amount: newAmount });

      expect(() => result.await()).toThrow(NotPositiveError);

      expect(centralPulse.amount).toBe(oldAmount);
      expect(centralPulse.updatedAt).toBe(oldUpdatedAt);
    });

    test('should reject with NotIntegerError if the new amount is not an integer', async () => {
      const oldAmount = validAmount;
      const gameID = validGameID;

      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = notIntegerAmount;

      const oldUpdatedAt = centralPulse.updatedAt;
      await sleep(100);

      const result = centralPulse.update({ amount: newAmount });

      expect(() => result.await()).toThrow(NotIntegerError);

      expect(centralPulse.amount).toBe(oldAmount);
      expect(centralPulse.updatedAt).toBe(oldUpdatedAt);
    });

    test('should not update anything when no valid properties are provided', async () => {
      const amount = validAmount;
      const gameID = validGameID;

      const centralPulse = CentralPulse.create({ amount, gameID }).await();

      const oldUpdatedAt = centralPulse.updatedAt;
      await sleep(100);

      centralPulse.update({}).await();

      expect(centralPulse.gap).toBe(1);
      expect(centralPulse.amount).toBe(amount);
      expect(centralPulse.gameID).toBe(gameID);
      expect(centralPulse.updatedAt).toBe(oldUpdatedAt);
    });
  });
});
