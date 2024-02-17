import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { UserModel } from '@domain/models';

import { AuthFieldValues, AuthFormMode, AuthFormProps } from './types';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { Container } from './styles';

import { githubIcon, googleIcon } from '@presentation/assets';

import { alertError } from '@presentation/utils';

export const AuthForm: FC<AuthFormProps> = (props) => {
  const { mode, onAuth, onWantToLogin, onWantToRegister } = props;

  const s = useStates({
    signing: false,
  });
  const signing = (): any => (s.signing = true);
  const signed = (): any => (s.signing = false);

  const { register, handleSubmit, formState } = useForm<AuthFieldValues>({
    mode: 'onChange',
  });

  const {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithProvider,
    signInAnonymously,
  } = useAuthUsecases();

  function onSubmit(data: AuthFieldValues): any {
    const { name, email, password } = data;

    signing();

    let promise: Promise<UserModel> | undefined = undefined;
    if (mode === 'login')
      promise = signInWithCredentials.execute({ email, password });
    if (mode === 'register')
      promise = signUpWithCredentials.execute({ name, email, password });

    promise?.then(onAuth).catch(alertError).finally(signed);
  }

  function handleAnonymousButtonClick(): any {
    signing();

    signInAnonymously.execute().then(onAuth).catch(alertError).finally(signed);
  }

  function handleGoogleButtonClick(): any {
    signing();

    signInWithProvider
      .execute('google')
      .then(onAuth)
      .catch(alertError)
      .finally(signed);
  }

  function handleGithubButtonClick(): any {
    signing();

    signInWithProvider
      .execute('github')
      .then(onAuth)
      .catch(alertError)
      .finally(signed);
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

      <button disabled={!formState.isValid || s.signing}>{button}</button>

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
          <button onClick={onWantToRegister}>Create one</button>!
        </span>
      )}
      {mode === 'register' && onWantToLogin && (
        <span className='changeMode'>
          Already have an account?{' '}
          <button onClick={onWantToLogin}>Login</button>
        </span>
      )}
    </Container>
  );
};

export namespace AuthForm {
  export type Mode = AuthFormMode;
}
