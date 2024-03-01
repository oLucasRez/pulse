import { UserModel } from '@domain/models';

export type AuthFormMode = 'login' | 'register';

export interface AuthFormProps {
  mode: AuthFormMode;
  onAuth?(me: UserModel): void | Promise<void>;
  onWantToRegister?(): void;
  onWantToLogin?(): void;
}

export type AuthFieldValues = {
  name: string;
  email: string;
  password: string;
};
