export class Asyncleton {
  private static promises: Record<string, Promise<unknown>> = {};

  public static clear(key: string): void {
    Asyncleton.promises[key]?.finally(() => {
      delete Asyncleton.promises[key];
    });
  }

  public static async run<R>(
    key: string,
    callback: () => Promise<R>,
    exp: number = 0,
  ): Promise<R> {
    if (!(key in Asyncleton.promises)) Asyncleton.promises[key] = callback();

    const result = Asyncleton.promises[key] as R;

    setTimeout(() => this.clear(key), exp);

    return result;
  }
}
