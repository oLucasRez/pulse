export interface SetCurrentGameUsecase {
  execute(id: string): Promise<void>;
}
