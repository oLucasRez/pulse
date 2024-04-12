export interface IDeleteGameUsecase {
  execute(id: string): Promise<void>;
}
