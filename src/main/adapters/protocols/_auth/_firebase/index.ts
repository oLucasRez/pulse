import {
  AuthProvider,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import {
  AlreadyExistsError,
  FailedError,
  ForbiddenError,
  InvalidDataError,
  OutOfBoundError,
  UnknownError,
} from '@domain/errors';
import { Provider } from '@domain/types';

import {
  AuthAnonymousProtocol,
  AuthCredentialsProtocol,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';
import { FirebaseService } from '@data/services';

import { FirebaseError } from 'firebase/app';

import { FirebaseErrorCode } from './types';

export class FirebaseAuth
  implements
    AuthCredentialsProtocol,
    AuthProviderProtocol,
    AuthAnonymousProtocol,
    SessionGetterProtocol,
    SessionDestroyerProtocol
{
  private getUser(): Promise<User | null> {
    return new Promise<User | null>((resolve) =>
      onAuthStateChanged(FirebaseService.auth, resolve),
    );
  }

  public async getSession(): Promise<SessionGetterProtocol.Response> {
    const user = await this.getUser();

    const providers: Provider[] = [];

    user?.providerData.map((userInfo) => {
      if (userInfo.providerId === 'google.com') providers.push('google');
      if (userInfo.providerId === 'github.com') providers.push('github');
    });

    return {
      uid: user?.uid || null,
      isAnonymous: user?.isAnonymous ?? false,
      providers,
    };
  }

  public async signUpWithCredentials(
    payload: AuthCredentialsProtocol.Payload,
  ): Promise<string> {
    const { email, password } = payload;

    try {
      const userCrendential = await createUserWithEmailAndPassword(
        FirebaseService.auth,
        email,
        password,
      );

      return userCrendential.user.uid;
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        case 'auth/invalid-email':
          throw new InvalidDataError({
            metadata: { prop: 'email', value: email },
          });
        case 'auth/weak-password':
          throw new OutOfBoundError({
            message: 'Password should be at least 6 characters',
            metadata: {
              prop: 'password',
              value: password,
              bound: 'below',
              limit: 6,
              unit: 'characters',
            },
          });
        case 'auth/email-already-in-use':
          throw new InvalidDataError({
            message: 'E-mail already in use',
            metadata: { prop: 'email', value: email },
          });
        default:
          console.error(error);
      }

      throw new FailedError({ metadata: { tried: 'sign up with password' } });
    }
  }

  public async signInWithCredentials(
    payload: AuthCredentialsProtocol.Payload,
  ): Promise<string> {
    const { email, password } = payload;

    try {
      const userCrendential = await signInWithEmailAndPassword(
        FirebaseService.auth,
        email,
        password,
      );

      return userCrendential.user.uid;
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        case 'auth/invalid-credential':
          throw new InvalidDataError({
            message: 'Invalid credentials',
          });
        default:
          console.error(error);
      }

      throw new FailedError({ metadata: { tried: 'sign in with password' } });
    }
  }

  public async signInWith(
    provider: Provider,
  ): Promise<AuthProviderProtocol.Response> {
    let authProvider: AuthProvider | null = null;

    switch (provider) {
      case 'google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'github':
        authProvider = new GithubAuthProvider();
        break;
      default:
        break;
    }

    const unknownProviderError = new UnknownError(
      `Provider ${provider} is unknown`,
    );

    if (!authProvider) throw unknownProviderError;

    try {
      const userCrendential = await signInWithPopup(
        FirebaseService.auth,
        authProvider,
      );

      return {
        uid: userCrendential.user.uid,
        name: userCrendential.user.displayName,
      };
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          throw new AlreadyExistsError({ metadata: { entity: 'User' } });
        default:
          console.error(error);
      }

      throw new FailedError({
        metadata: { tried: `sign in with ${provider}` },
      });
    }
  }

  public async linkWith(
    provider: Provider,
  ): Promise<AuthProviderProtocol.Response> {
    const user = await this.getUser();
    if (!user)
      throw new ForbiddenError({ metadata: { tried: 'link without user' } });

    let authProvider: AuthProvider | null = null;

    switch (provider) {
      case 'google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'github':
        authProvider = new GithubAuthProvider();
        break;
      default:
        break;
    }

    if (!authProvider)
      throw new UnknownError(`Provider ${provider} is unknown`);

    try {
      const userCrendential = await linkWithPopup(user, authProvider);

      return {
        uid: userCrendential.user.uid,
        name: userCrendential.user.displayName,
      };
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        case 'auth/credential-already-in-use':
        case 'auth/email-already-in-use':
          throw new AlreadyExistsError({ metadata: { entity: 'User' } });
        default:
          console.error(error);
      }

      throw new FailedError({ metadata: { tried: `link with ${provider}` } });
    }
  }

  public async signInAnonymously(): Promise<string> {
    try {
      const userCrendential = await signInAnonymously(FirebaseService.auth);

      return userCrendential.user.uid;
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        default:
          console.error(error);
      }

      throw new FailedError({ metadata: { tried: 'sign in anonymously' } });
    }
  }

  public async destroySession(): Promise<void> {
    try {
      await signOut(FirebaseService.auth);
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        default:
          console.error(error);
      }

      throw new FailedError({ metadata: { tried: 'sign out' } });
    }
  }
}
