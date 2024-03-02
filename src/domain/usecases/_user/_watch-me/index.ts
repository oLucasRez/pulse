import { UserModel } from '@domain/models';

export interface WatchMeUsecase {
  execute(callback: WatchMeUsecase.Callback): Promise<WatchMeUsecase.Response>;
}

export namespace WatchMeUsecase {
  export type Callback = (me: UserModel | null) => void;
  export type Response = () => void;
}
