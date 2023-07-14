export function generateAll<T = unknown, TReturn = any, TNext = unknown>(
  generator: Generator<T, TReturn, TNext>,
  ...nextArgs: [] | [TNext]
): TReturn {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = generator.next(...nextArgs);

    if (result.done) return result.value;
  }
}
