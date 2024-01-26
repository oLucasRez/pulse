export interface DeletePlayerUsecase {
  execute(id: string): Promise<void>;
}
