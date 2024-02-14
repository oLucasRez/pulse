import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { SignInFieldValues } from './types';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { Container } from './styles';

import { githubIcon, googleIcon } from '@presentation/assets';

import { alertError } from '@presentation/utils';

const LoginPage: FC = () => {
  const s = useStates({
    signingIn: false,
  });
  const signingIn = (): any => (s.signingIn = true);
  const signedIn = (): any => (s.signingIn = false);

  const { register, handleSubmit, formState } = useForm<SignInFieldValues>({
    mode: 'onChange',
  });

  const { signInWithCredentials, signInWithProvider } = useAuthUsecases();

  const { navigateToHome, linkToRegisterProps } = useNavigate();

  function onSubmit(data: SignInFieldValues): any {
    signingIn();

    signInWithCredentials
      .execute({
        email: data.email,
        password: data.password,
      })
      .then(navigateToHome)
      .catch(alertError)
      .finally(signedIn);
  }

  function handleGoogleButtonClick(): any {
    signingIn();

    signInWithProvider
      .execute('google')
      .then(navigateToHome)
      .catch(alertError)
      .finally(signedIn);
  }

  function handleGithubButtonClick(): any {
    signingIn();

    signInWithProvider
      .execute('github')
      .then(navigateToHome)
      .catch(alertError)
      .finally(signedIn);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login{s.signingIn && <span className='loading'>⏳</span>}</h2>

        <label htmlFor='email'>E-mail</label>
        <input {...register('email', { required: true })} id='email' />

        <label htmlFor='password'>Password</label>
        <input
          {...register('password', { required: true })}
          id='password'
          type='password'
        />

        <button disabled={!formState.isValid || s.signingIn}>Login</button>

        <div className='providers'>
          <span>Or sign in with:</span>
          <button onClick={handleGoogleButtonClick} disabled={s.signingIn}>
            <img src={googleIcon} />
          </button>
          <button onClick={handleGithubButtonClick} disabled={s.signingIn}>
            <img src={githubIcon} />
          </button>
        </div>

        <span className='toRegisterPage'>
          Do not have an account yet?{' '}
          <Link {...linkToRegisterProps}>Create one</Link>!
        </span>
      </form>
    </Container>
  );
};

export { loginLoader } from './loader';

export default LoginPage;
