export interface IDeletePlayerUsecase {
  execute(id: string): Promise<void>;
}
