export interface SessionGetterProtocol {
  getSession(): Promise<string | null>;
}

export interface AuthPasswordProtocol {
  signUpWithPassword(payload: AuthPasswordProtocol.Payload): Promise<string>;
}

export namespace AuthPasswordProtocol {
  export type Payload = {
    email: string;
    password: string;
  };
}
