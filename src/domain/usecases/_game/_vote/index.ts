export interface IVoteUsecase {
  execute(playerID: string, value: boolean): Promise<void>;
}
