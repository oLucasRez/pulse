export interface Usecase<R = void, P = undefined> {
  execute(payload: P): Promise<R>;
}

export * from './_player';
