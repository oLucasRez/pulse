import { faker } from '@faker-js/faker';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
  OutOfBoundError,
} from '@domain/errors';

import { sleep } from '@utils/sleep';

import { Dice } from '../dice';
import { Vector } from '../vector';

describe('Dice', () => {
  const validID = faker.string.uuid();

  const validSides = faker.number.int();
  const notPositiveSides = -faker.number.int({ min: 1 });
  const notIntegerSides = faker.number.float();

  const defaultValue = null;
  const validValue = faker.number.int({ min: 1, max: validSides });
  const otherValidValue = faker.number.int({ min: 1, max: validSides });
  const notIntegerValue = faker.number.float();
  const lowerThan1Value = faker.number.int({
    min: Number.MIN_SAFE_INTEGER,
    max: 0,
  });
  const greaterThanSidesValue = faker.number.int({ min: validSides + 1 });

  const validPosition = Vector.create([
    faker.number.float({
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
    }),
    faker.number.float({
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
    }),
  ]).await();

  const validPlayerID = faker.string.uuid();
  const missingPlayerID = '';

  const validCreatedAt = faker.date.recent().toISOString();
  const validUpdatedAt = faker.date.recent().toISOString();

  describe('create', () => {
    test('should create a Dice with only required props', () => {
      const sides = validSides;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({ sides, position, playerID }).await();

      expect(dice.id).toBeDefined();
      expect(dice.sides).toBe(sides);
      expect(dice.value).toBe(defaultValue);
      expect(dice.position).toBe(position);
      expect(dice.playerID).toBe(playerID);
      expect(dice.createdAt).toBeDefined();
      expect(dice.updatedAt).toBeDefined();
    });

    test('should create a Dice with all props', () => {
      const id = validID;
      const sides = validSides;
      const value = validValue;
      const position = validPosition;
      const playerID = validPlayerID;
      const createdAt = validCreatedAt;
      const updatedAt = validUpdatedAt;

      const dice = Dice.create({
        id,
        sides,
        value,
        position,
        playerID,
        createdAt,
        updatedAt,
      }).await();

      expect(dice.id).toBe(id);
      expect(dice.sides).toBe(sides);
      expect(dice.value).toBe(value);
      expect(dice.position).toBe(position);
      expect(dice.playerID).toBe(playerID);
      expect(dice.createdAt).toBe(createdAt);
      expect(dice.updatedAt).toBe(updatedAt);
    });

    test('should reject with NotPositiveError if sides is not a positive number', () => {
      const sides = notPositiveSides;
      const position = validPosition;
      const playerID = validPlayerID;

      const result = Dice.create({ sides, position, playerID });

      expect(() => result.await()).toThrow(NotPositiveError);
    });

    test('should reject with NotIntegerError if sides is not an integer', () => {
      const sides = notIntegerSides;
      const position = validPosition;
      const playerID = validPlayerID;

      const result = Dice.create({ sides, position, playerID });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with NotIntegerError if value exists and is not an integer', () => {
      const sides = validSides;
      const value = notIntegerValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const result = Dice.create({ sides, value, position, playerID });

      expect(() => result.await()).toThrow(NotIntegerError);
    });

    test('should reject with OutOfBoundError if value exists and is lower than 1', () => {
      const sides = validSides;
      const value = lowerThan1Value;
      const position = validPosition;
      const playerID = validPlayerID;

      const result = Dice.create({ sides, value, position, playerID });

      expect(() => result.await()).toThrow(OutOfBoundError);
    });

    test('should reject with OutOfBoundError if value exists and is greater than sides', () => {
      const sides = validSides;
      const value = greaterThanSidesValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const result = Dice.create({ sides, value, position, playerID });

      expect(() => result.await()).toThrow(OutOfBoundError);
    });

    test('should reject with MissingForeignKeyError if playerID is missing', () => {
      const sides = validSides;
      const position = validPosition;
      const playerID = missingPlayerID;

      const result = Dice.create({ sides, position, playerID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    test('should update value when provided', async () => {
      const sides = validSides;
      const oldValue = validValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({
        sides,
        value: oldValue,
        position,
        playerID,
      }).await();

      const newValue = otherValidValue;

      const oldUpdatedAt = dice.updatedAt;
      await sleep(100);

      dice.update({ value: newValue }).await();

      expect(dice.value).toBe(newValue);
      expect(dice.updatedAt).not.toBe(oldUpdatedAt);
    });

    test('should reject with NotIntegerError if the new value is not an integer', async () => {
      const sides = validSides;
      const oldValue = validValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({
        sides,
        value: oldValue,
        position,
        playerID,
      }).await();

      const newValue = notIntegerValue;

      const oldUpdatedAt = dice.updatedAt;
      await sleep(100);

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(NotIntegerError);

      expect(dice.value).toBe(oldValue);
      expect(dice.updatedAt).toBe(oldUpdatedAt);
    });

    test('should reject with OutOfBoundError if the new value is lower than 1', async () => {
      const sides = validSides;
      const oldValue = validValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({
        sides,
        value: oldValue,
        position,
        playerID,
      }).await();

      const newValue = lowerThan1Value;

      const oldUpdatedAt = dice.updatedAt;
      await sleep(100);

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(OutOfBoundError);

      expect(dice.value).toBe(oldValue);
      expect(dice.updatedAt).toBe(oldUpdatedAt);
    });

    test('should reject with OutOfBoundError if the new value is greater than sides', async () => {
      const sides = validSides;
      const oldValue = validValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({
        sides,
        value: oldValue,
        position,
        playerID,
      }).await();

      const newValue = greaterThanSidesValue;

      const oldUpdatedAt = dice.updatedAt;
      await sleep(100);

      const result = dice.update({ value: newValue });

      expect(() => result.await()).toThrow(OutOfBoundError);

      expect(dice.value).toBe(oldValue);
      expect(dice.updatedAt).toBe(oldUpdatedAt);
    });

    test('should not update anything when no valid properties are provided', async () => {
      const sides = validSides;
      const value = validValue;
      const position = validPosition;
      const playerID = validPlayerID;

      const dice = Dice.create({ sides, value, position, playerID }).await();

      const oldUpdatedAt = dice.updatedAt;
      await sleep(100);

      dice.update({}).await();

      expect(dice.sides).toBe(sides);
      expect(dice.value).toBe(value);
      expect(dice.position).toBe(position);
      expect(dice.playerID).toBe(playerID);
      expect(dice.updatedAt).toBe(oldUpdatedAt);
    });
  });
});
