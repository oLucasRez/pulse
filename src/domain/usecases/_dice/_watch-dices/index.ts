import { DiceModel } from '@domain/models';

export interface WatchDicesUsecase {
  execute(callback: WatchDicesUsecase.Callback): WatchDicesUsecase.Response;
}

export namespace WatchDicesUsecase {
  export type Callback = (dices: DiceModel[]) => void;
  export type Response = () => void;
}
