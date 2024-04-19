export interface IUsecase<A extends unknown[], R> {
  execute(...args: A): Promise<R>;
}

export type Props<A extends unknown[], R> = {
  onSuccess?(data: R, args: A): void;
};
