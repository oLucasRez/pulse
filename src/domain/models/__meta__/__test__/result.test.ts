import { DomainError } from '@domain/errors';

import { Result } from '../result';

describe('Result', () => {
  class TestError extends DomainError {
    constructor(message?: string) {
      super(message);
      Object.setPrototypeOf(this, TestError.prototype);
    }
  }

  describe('resolve', () => {
    test('should create a resolved Result with a value', () => {
      const value = 'success';
      const result = Result.resolve(value);

      expect(result.resolved).toBe(true);
      expect(result.rejected).toBe(false);
      expect(result.then).toBeInstanceOf(Function);
      expect(result.catch).toBeInstanceOf(Function);
      expect(() => result.await()).toBeInstanceOf(Function);

      const resolvedValue = result.await();

      expect(resolvedValue).toBe(value);
    });
  });

  describe('reject', () => {
    test('should create a rejected Result with an error', () => {
      const error = new TestError('error');
      const result = Result.reject(error);

      expect(result.resolved).toBe(false);
      expect(result.rejected).toBe(true);
      expect(result.then).toBeInstanceOf(Function);
      expect(result.catch).toBeInstanceOf(Function);
      expect(() => result.await()).toBeInstanceOf(Function);

      expect(() => result.await()).toThrow(error);
    });
  });

  describe('then', () => {
    test('should call the callback when the Result is resolved', () => {
      const value = 'success';
      const result = Result.resolve(value);
      const callback = jest.fn();

      result.then(callback);

      expect(callback).toHaveBeenCalledWith(value);
    });

    test('should not call the callback when the Result is rejected', () => {
      const error = new TestError('error');
      const result = Result.reject(error);
      const callback = jest.fn();

      result.then(callback);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('catch', () => {
    test('should call the callback when the Result is rejected with the specified error class', () => {
      const error = new TestError('error');
      const result = Result.reject(error);
      const callback = jest.fn();

      result.catch(TestError, callback);

      expect(callback).toHaveBeenCalledWith(error);
    });

    test('should not call the callback when the Result is resolved', () => {
      const value = 'success';
      const result = Result.resolve(value);
      const callback = jest.fn();

      result.catch(TestError, callback);

      expect(callback).not.toHaveBeenCalled();
    });

    test('should not call the callback when the Result is rejected with a different error class', () => {
      class OtherTestError extends DomainError {
        constructor(message?: string) {
          super(message);
          Object.setPrototypeOf(this, OtherTestError.prototype);
        }
      }

      const error = new OtherTestError('error');
      const result = Result.reject(error);
      const callback = jest.fn();

      result.catch(TestError, callback);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('await', () => {
    test('should return the value when the Result is resolved', () => {
      const value = 'success';
      const result = Result.resolve(value);

      const resolvedValue = result.await();
      expect(resolvedValue).toBe(value);
    });

    test('should throw the error when the Result is rejected', () => {
      const error = new TestError('error');
      const result = Result.reject(error);

      expect(() => result.await()).toThrow(error);
    });
  });
});
