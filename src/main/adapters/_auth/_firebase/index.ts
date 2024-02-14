import { DuplicatedError } from '@domain/errors/_duplicated';
import {
  AuthProvider as AuthProviderInstance,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import {
  FailedError,
  InvalidDataError,
  OutOfBoundError,
  UnknownError,
} from '@domain/errors';

import { FirebaseErrorCode } from './types';

import {
  AuthCredentialsProtocol,
  AuthProvider,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import { FirebaseService } from '@data/services';

import { FirebaseError } from 'firebase/app';

export class FirebaseAuth
  implements
    AuthCredentialsProtocol,
    AuthProviderProtocol,
    SessionGetterProtocol,
    SessionDestroyerProtocol
{
  public getSession(): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      onAuthStateChanged(FirebaseService.auth, async (user) =>
        resolve(user?.uid || null),
      );
    });
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

  // auth/account-exists-with-different-credential

  public async signInWith(
    provider: AuthProvider,
  ): Promise<AuthProviderProtocol.Response> {
    let authProvider: AuthProviderInstance | null = null;

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
      const userCrendential = await signInWithPopup(
        FirebaseService.auth,
        authProvider,
      );

      const info = getAdditionalUserInfo(userCrendential);

      return {
        uid: userCrendential.user.uid,
        name: userCrendential.user.displayName,
        isNewUser: info?.isNewUser ?? false,
      };
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code as FirebaseErrorCode;

      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          throw new DuplicatedError({ metadata: { entity: 'User' } });
        default:
          console.error(error);
      }

      throw new FailedError({
        metadata: { tried: `sign in with ${provider}` },
      });
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
