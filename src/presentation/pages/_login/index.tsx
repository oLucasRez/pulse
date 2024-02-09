import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserModel } from '@domain/models';

import { useStates } from '@presentation/hooks';

import { GlobalLoading } from '@presentation/components';

import { makeDatabase } from '@main/factories';

const db = makeDatabase();

export const Component: FC = () => {
  const s = useStates({
    users: [] as UserModel[],
    fetchingUsers: false,
  });

  useEffect(() => {
    (async (): Promise<any> => {
      s.fetchingUsers = true;

      s.users = await db.select<UserModel>('users');

      s.fetchingUsers = false;
    })();
  }, []);

  const navigate = useNavigate();

  if (s.fetchingUsers) return <GlobalLoading />;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <ul>
        {s.users.map((user) => (
          <li
            key={user.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {user.name}{' '}
            <button
              onClick={(): any => {
                localStorage.setItem('session', user.id);
                navigate('/');
              }}
            >
              Login
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Component.displayName = 'LoginPage';
