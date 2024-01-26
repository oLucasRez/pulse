export interface Usecase<P, R> {
  execute(params: P): Promise<R>;
}

export * from './_player';
