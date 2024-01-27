export interface DeleteDiceUsecase {
  execute(id: string): Promise<void>;
}
