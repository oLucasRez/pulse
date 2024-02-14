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

export interface AuthProviderProtocol {
  signInWith(provider: AuthProvider): Promise<AuthProviderProtocol.Response>;
}

export type AuthProvider = 'google' | 'github';

export namespace AuthProviderProtocol {
  export type Response = {
    uid: string;
    name: string | null;
    isNewUser: boolean;
  };
}
