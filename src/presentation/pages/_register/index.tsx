import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { SignUpFieldValues } from './types';

import { useNavigate, useStates } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { Container } from './styles';

import { alertError } from '@presentation/utils';

const RegisterPage: FC = () => {
  const s = useStates({
    signingUp: false,
  });
  const signingUp = (): any => (s.signingUp = true);
  const signedUp = (): any => (s.signingUp = false);

  const { register, handleSubmit, formState } = useForm<SignUpFieldValues>({
    mode: 'onChange',
  });

  const { signUpWithPassword } = useAuthUsecases();

  const { navigateToHome, linkToLoginProps } = useNavigate();

  function onSubmit(data: SignUpFieldValues): any {
    signingUp();

    signUpWithPassword
      .execute({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then(navigateToHome)
      .catch(alertError)
      .finally(signedUp);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          Create an account{s.signingUp && <span className='loading'>⏳</span>}
        </h2>

        <label htmlFor='name'>Name</label>
        <input {...register('name', { required: true })} id='name' autoFocus />

        <label htmlFor='email'>E-mail</label>
        <input {...register('email', { required: true })} id='email' />

        <label htmlFor='password'>Password</label>
        <input
          {...register('password', { required: true })}
          id='password'
          type='password'
        />

        <button disabled={!formState.isValid || s.signingUp}>Register</button>

        <span className='toLoginPage'>
          Already have an account? <Link {...linkToLoginProps}>login</Link>
        </span>
      </form>
    </Container>
  );
};

export { registerLoader } from './loader';

export default RegisterPage;
