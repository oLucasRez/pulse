export function dontThrow<R>(callback: () => R): R | undefined {
  try {
    return callback();
  } catch {
    //
  }
}
