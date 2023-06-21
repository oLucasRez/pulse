import { faker } from '@faker-js/faker';

import { MissingForeignKeyError } from '@domain/errors';

import { sleep } from '@utils/sleep';
import { getRandomEnumValue } from '@utils/tests';

import { Game } from '../game';

describe('Game', () => {
  const validID = faker.string.uuid();

  const defaultState = Game.State.START;
  const validState = getRandomEnumValue(Game.State);
  const otherValidState = getRandomEnumValue(Game.State);

  const validUserID = faker.string.uuid();
  const missingUserID = '';

  const validCreatedAt = faker.date.recent().toISOString();
  const validUpdatedAt = faker.date.recent().toISOString();

  describe('create', () => {
    test('should create a Game with only required props', () => {
      const userID = validUserID;

      const game = Game.create({ userID }).await();

      expect(game.id).toBeDefined();
      expect(game.state).toBe(defaultState);
      expect(game.userID).toBe(userID);
      expect(game.createdAt).toBeDefined();
      expect(game.updatedAt).toBeDefined();
    });

    test('should create a Game with all props', () => {
      const id = validID;
      const state = validState;
      const userID = validUserID;
      const createdAt = validCreatedAt;
      const updatedAt = validUpdatedAt;

      const game = Game.create({
        id,
        state,
        userID,
        createdAt,
        updatedAt,
      }).await();

      expect(game.id).toBe(id);
      expect(game.state).toBe(state);
      expect(game.userID).toBe(userID);
      expect(game.createdAt).toBe(createdAt);
      expect(game.updatedAt).toBe(updatedAt);
    });

    test('should reject with MissingForeignKeyError if userID is missing', () => {
      const userID = missingUserID;

      const result = Game.create({ userID });

      expect(() => result.await()).toThrow(MissingForeignKeyError);
    });
  });

  describe('update', () => {
    test('should update state when provided', async () => {
      const oldState = validState;
      const userID = validUserID;

      const game = Game.create({ state: oldState, userID }).await();

      const newState = otherValidState;

      const oldUpdatedAt = game.updatedAt;
      await sleep(100);

      game.update({ state: newState }).await();

      expect(game.state).toBe(newState);
      expect(game.updatedAt).not.toBe(oldUpdatedAt);
    });

    test('should not update anything when no properties are provided', async () => {
      const state = validState;
      const userID = validUserID;

      const game = Game.create({ state, userID }).await();

      const oldUpdatedAt = game.updatedAt;
      await sleep(100);

      game.update({}).await();

      expect(game.state).toBe(state);
      expect(game.userID).toBe(userID);
      expect(game.updatedAt).toBe(oldUpdatedAt);
    });
  });
});
