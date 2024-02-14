import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { FailedError, InvalidDataError, OutOfBoundError } from '@domain/errors';

import { FirebaseErrorCode } from './types';

import {
  AuthCredentialsProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import { FirebaseService } from '@data/services';

import { FirebaseError } from 'firebase/app';

export class FirebaseAuth
  implements
    AuthCredentialsProtocol,
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
