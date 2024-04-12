import { DiceModel } from '@domain/models';

export interface IWatchDicesUsecase {
  execute(
    callback: IWatchDicesUsecase.Callback,
  ): Promise<IWatchDicesUsecase.Response>;
}

export namespace IWatchDicesUsecase {
  export type Callback = (dices: DiceModel[]) => void;
  export type Response = () => void;
}
