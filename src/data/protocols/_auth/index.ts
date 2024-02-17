import { Provider } from '@domain/types';

export interface SessionGetterProtocol {
  getSession(): Promise<SessionGetterProtocol.Response>;
}

export namespace SessionGetterProtocol {
  export type Response = {
    uid: string | null;
    isAnonymous: boolean;
    providers: Provider[];
  };
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
  signInWith(provider: Provider): Promise<AuthProviderProtocol.Response>;
  linkWith(provider: Provider): Promise<AuthProviderProtocol.Response>;
}

export namespace AuthProviderProtocol {
  export type Response = {
    uid: string;
    name: string | null;
  };
}

export interface AuthAnonymousProtocol {
  signInAnonymously(): Promise<string>;
}
