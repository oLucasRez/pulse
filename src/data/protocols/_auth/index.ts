export interface SessionGetterProtocol {
  getSession(): Promise<string | null>;
}

export interface SessionDestroyerProtocol {
  destroySession(): Promise<void>;
}

export interface AuthPasswordProtocol {
  signUpWithPassword(payload: AuthPasswordProtocol.Payload): Promise<string>;
  signInWithPassword(payload: AuthPasswordProtocol.Payload): Promise<string>;
}

export namespace AuthPasswordProtocol {
  export type Payload = {
    email: string;
    password: string;
  };
}
