export interface BanPlayerUsecase {
  execute(id: string): Promise<void>;
}
