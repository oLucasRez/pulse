export interface DeleteGameUsecase {
  execute(id: string): Promise<void>;
}
