export function delay(ms: number): void {
  const stopAt = Date.now() + ms;
  while (Date.now() < stopAt) {
    //
  }
}
