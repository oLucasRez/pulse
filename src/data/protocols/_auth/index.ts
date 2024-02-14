export interface SessionGetterProtocol {
  getSession(): Promise<string | null>;
}

export interface SessionDestroyerProtocol {
  destroySession(): Promise<void>;
}

export interface AuthCredentialsProtocol {
  signUpWithCredentials(
    payload: AuthCredentialsProtocol.Payload,
  ): Promise<string>;
  signInWithCredentials(
    payload: AuthCredentialsProtocol.Payload,
  ): Promise<string>;
}

export namespace AuthCredentialsProtocol {
  export type Payload = {
    email: string;
    password: string;
  };
}
