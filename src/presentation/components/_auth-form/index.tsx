import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { UserModel } from '@domain/models';

import { githubIcon, googleIcon } from '@presentation/assets';
import { useAuthUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { Container } from './styles';

import { AuthFieldValues, AuthFormMode, AuthFormProps } from './types';

export const AuthForm: FC<AuthFormProps> = (props) => {
  const { mode, onAuth, onWantToLogin, onWantToRegister } = props;

  const [s, set] = useStates({
    signing: false,
  });

  const { register, handleSubmit, formState } = useForm<AuthFieldValues>({
    mode: 'onChange',
  });

  const {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithProvider,
    signInAnonymously,
  } = useAuthUsecases();

  const handleAuth = (me: UserModel) =>
    onAuth?.(me)?.finally(set('signing', false));

  function onSubmit(data: AuthFieldValues) {
    const { name, email, password } = data;

    set('signing')(true);

    let promise: Promise<UserModel> | undefined = undefined;
    if (mode === 'login') promise = signInWithCredentials({ email, password });
    if (mode === 'register')
      promise = signUpWithCredentials({ name, email, password });

    promise?.then(handleAuth).catch(alertError).finally(set('signing', false));
  }

  function handleAnonymousButtonClick() {
    set('signing')(true);

    signInAnonymously()
      .then(handleAuth)
      .catch(alertError)
      .finally(set('signing', false));
  }

  function handleGoogleButtonClick() {
    set('signing')(true);

    signInWithProvider('google')
      .then(handleAuth)
      .catch(alertError)
      .finally(set('signing', false));
  }

  function handleGithubButtonClick() {
    set('signing')(true);

    signInWithProvider('github')
      .then(handleAuth)
      .catch(alertError)
      .finally(set('signing', false));
  }

  const title = (
    {
      login: 'Login',
      register: 'Create an account',
    } satisfies Record<AuthFormMode, string>
  )[mode];

  const button = (
    {
      login: 'Login',
      register: 'Register',
    } satisfies Record<AuthFormMode, string>
  )[mode];

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h2>
        {title}

        {s.signing ? (
          <span className='loading'>⏳</span>
        ) : (
          <button className='anonymous' onClick={handleAnonymousButtonClick}>
            Guest mode 🥸
          </button>
        )}
      </h2>

      {mode === 'register' && (
        <>
          <label htmlFor='name'>Name</label>
          <input
            {...register('name', { required: true })}
            id='name'
            autoFocus
          />
        </>
      )}

      <label htmlFor='email'>E-mail</label>
      <input {...register('email', { required: true })} id='email' />

      <label htmlFor='password'>Password</label>
      <input
        {...register('password', { required: true })}
        id='password'
        type='password'
      />

      <button type='submit' disabled={!formState.isValid || s.signing}>
        {button}
      </button>

      <div className='providers'>
        <span>Or sign in with:</span>
        <button onClick={handleGoogleButtonClick} disabled={s.signing}>
          <img src={googleIcon} />
        </button>
        <button onClick={handleGithubButtonClick} disabled={s.signing}>
          <img src={githubIcon} />
        </button>
      </div>

      {mode === 'login' && onWantToRegister && (
        <span className='changeMode'>
          Do not have an account yet?{' '}
          <button type='reset' onClick={onWantToRegister}>
            Create one
          </button>
          !
        </span>
      )}
      {mode === 'register' && onWantToLogin && (
        <span className='changeMode'>
          Already have an account?{' '}
          <button type='reset' onClick={onWantToLogin}>
            Login
          </button>
        </span>
      )}
    </Container>
  );
};

export namespace AuthForm {
  export type Mode = AuthFormMode;
}
