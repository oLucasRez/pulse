import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
} from '@domain/errors';

import { uuid } from '@utils';

import { CentralPulse } from '../central-pulse';

describe('CentralPulse', () => {
  const gameID = uuid();

  describe('create', () => {
    test('should create a CentralPulse with valid props', () => {
      const amount = 5;

      const centralPulse = CentralPulse.create({ amount, gameID }).await();

      expect(centralPulse.id).toBeDefined();
      expect(centralPulse.gap).toBe(1);
      expect(centralPulse.amount).toBe(amount);
      expect(centralPulse.gameID).toBe(gameID);
    });

    test('should reject with NotPositiveError if amount is not a positive number', () => {
      const amount = -1;

      const result = CentralPulse.create({ amount, gameID });

      expect(() => result.await()).toThrow(NotPositiveError);
    });

    test('should reject with NotIntegerError if amount is not an integer', () => {
      const amount = 5.5;

      const result = CentralPulse.create({ amount, gameID });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with MissingForeignKeyError if gameID is missing', () => {
      const amount = 5;

      const result = CentralPulse.create({ amount, gameID: '' });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    const oldAmount = 5;

    test('should update the amount when provided', () => {
      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = 10;

      centralPulse.update({ amount: newAmount });

      expect(centralPulse.amount).toBe(newAmount);
    });

    test('should reject with NotPositiveError if the new amount is not a positive number', () => {
      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = -1;

      const result = centralPulse.update({ amount: newAmount });

      expect(() => result.await()).toThrow(NotPositiveError);

      expect(centralPulse.amount).toBe(oldAmount);
    });

    test('should reject with NotIntegerError if the new amount is not an integer', () => {
      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      const newAmount = 5.5;

      const result = centralPulse.update({ amount: newAmount });

      expect(() => result.await()).toThrow(NotIntegerError);

      expect(centralPulse.amount).toBe(oldAmount);
    });

    test('should not update anything when no valid properties are provided', () => {
      const centralPulse = CentralPulse.create({
        amount: oldAmount,
        gameID,
      }).await();

      centralPulse.update({}).await();

      expect(centralPulse.gap).toBe(1);
      expect(centralPulse.amount).toBe(oldAmount);
      expect(centralPulse.gameID).toBe(gameID);
    });
  });
});
