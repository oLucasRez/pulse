import {
  NotIntegerError,
  NotPositiveError,
  OutOfBoundError,
} from '@domain/errors';

import { uuid } from '@utils';

import { Dice } from '../dice';

describe('Dice', () => {
  const playerID = uuid();

  describe('create', () => {
    test('should create a Dice with valid props', () => {
      const sides = 6;
      const x = 2;
      const y = 3;

      const dice = Dice.create({ sides, position: { x, y }, playerID }).await();

      expect(dice.id).toBeDefined();
      expect(dice.sides).toBe(sides);
      expect(dice.value).toBeNull();
      expect(dice.position.x).toBe(x);
      expect(dice.position.y).toBe(y);
      expect(dice.playerID).toBe(playerID);
    });

    test('should reject with NotPositiveError if sides is not a positive number', () => {
      const sides = -1;

      const result = Dice.create({ sides, position: [2, 3], playerID });

      expect(() => result.await()).toThrow(NotPositiveError);
    });

    test('should reject with NotIntegerError if sides is not an integer', () => {
      const sides = 5.5;

      const result = Dice.create({ sides, position: [2, 3], playerID });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with NotIntegerError if value exists and is not an integer', () => {
      const value = 5.5;

      const result = Dice.create({
        sides: 6,
        value,
        position: [2, 3],
        playerID,
      });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with OutOfBoundError if value exists and is lower than 1', () => {
      const value = 0;

      const result = Dice.create({
        sides: 6,
        value,
        position: [2, 3],
        playerID,
      });

      expect(() => result.await()).toThrow(OutOfBoundError);
    });

    test('should reject with OutOfBoundError if value exists and is greater than sides', () => {
      const value = 7;

      const result = Dice.create({
        sides: 6,
        value,
        position: [2, 3],
        playerID,
      });

      expect(() => result.await()).toThrow(OutOfBoundError);
    });
  });

  describe('update', () => {
    const oldValue = 4;

    test('should update the value when provided', () => {
      const dice = Dice.create({
        sides: 6,
        value: oldValue,
        position: [2, 3],
        playerID,
      }).await();

      const newValue = 2;

      dice.update({ value: newValue });

      expect(dice.value).toBe(newValue);
    });

    test('should reject with NotIntegerError if the new value is not an integer', () => {
      const dice = Dice.create({
        sides: 6,
        value: oldValue,
        position: [2, 3],
        playerID,
      }).await();

      const newValue = 5.5;

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(NotIntegerError);

      expect(dice.value).toBe(oldValue);
    });

    test('should reject with OutOfBoundError if the new value is lower than 1', () => {
      const dice = Dice.create({
        sides: 6,
        value: oldValue,
        position: [2, 3],
        playerID,
      }).await();

      const newValue = 0;

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(OutOfBoundError);

      expect(dice.value).toBe(oldValue);
    });

    test('should reject with OutOfBoundError if the new value is greater than sides', () => {
      const dice = Dice.create({
        sides: 6,
        value: oldValue,
        position: [2, 3],
        playerID,
      }).await();

      const newValue = 7;

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(OutOfBoundError);

      expect(dice.value).toBe(oldValue);
    });

    test('should not update anything when no valid properties are provided', () => {
      const sides = 6;
      const value = 3;
      const x = 2;
      const y = 3;

      const dice = Dice.create({
        sides,
        value,
        position: { x, y },
        playerID,
      }).await();

      dice.update({}).await();

      expect(dice.sides).toBe(sides);
      expect(dice.value).toBe(value);
      expect(dice.position.x).toBe(x);
      expect(dice.position.y).toBe(y);
      expect(dice.playerID).toBe(playerID);
    });
  });
});
