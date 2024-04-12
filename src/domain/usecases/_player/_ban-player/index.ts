export interface IBanPlayerUsecase {
  execute(id: string): Promise<void>;
}
