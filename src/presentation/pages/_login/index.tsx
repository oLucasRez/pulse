import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { SignInFieldValues } from './types';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { Container } from './styles';

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

  const { signInWithPassword } = useAuthUsecases();

  const { navigateToHome, linkToRegisterProps } = useNavigate();

  function onSubmit(data: SignInFieldValues): any {
    signingIn();

    signInWithPassword
      .execute({
        email: data.email,
        password: data.password,
      })
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
