import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { Color } from '@domain/enums';

import { DomainError } from '@domain/errors';

import {
  CreatePlayerModalContextProviderProps,
  CreatePlayerModalContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { darken, getColor } from '@presentation/styles/mixins';

import { mapEnum } from '@domain/utils';

import { useAuthUsecases, usePlayerUsecases } from '..';
import { Container } from './styles';

const Context = createContext({} as CreatePlayerModalContextValue);

export const useCreatePlayerModal = (): CreatePlayerModalContextValue =>
  useContext(Context);

export const CreatePlayerModalContextProvider: FC<
  CreatePlayerModalContextProviderProps
> = (props) => {
  const { children } = props;

  const { getMe } = useAuthUsecases();

  const s = useStates({
    open: false,
    name: '',
    color: undefined as Color | undefined,
    creatingPlayer: false,
  });

  const creatingPlayer = (): any => (s.creatingPlayer = true);
  const createdPlayer = (): any => (s.creatingPlayer = false);

  const openCreatePlayerModal = useCallback(() => (s.open = true), [s.open]);

  const closeModal = (): any => (s.open = false);

  const logError = (e: DomainError): any => console.error(e.message);
  const alertError = (e: DomainError): any => alert(e.message);

  useEffect(() => {
    getMe
      .execute()
      .then((me) => me && (s.name = me.name))
      .catch(logError);
  }, []);

  const submitDisabled = !s.name || !s.color || s.creatingPlayer;

  const { createPlayer } = usePlayerUsecases();

  function handleSubmitButtonClick(): any {
    const { name, color } = s;

    if (!name || !color) return;

    creatingPlayer();

    createPlayer
      .execute({ name, color })
      .then(closeModal)
      .catch(alertError)
      .finally(createdPlayer);
  }

  return (
    <Context.Provider value={{ openCreatePlayerModal }}>
      {children}

      {s.open && (
        <Container onClick={(): any => (s.open = false)}>
          <article className='modal' onClick={(e): any => e.stopPropagation()}>
            <header>
              <h2>Create player</h2>
              <button onClick={(): any => (s.open = false)}>x</button>
            </header>

            <main>
              <input
                className='name'
                placeholder='Name'
                defaultValue={s.name}
                onChange={(e): any => (s.name = e.target.value)}
              />

              <div className='colors'>
                {mapEnum(Color, (color) => {
                  const styledColor = getColor(color);

                  return (
                    <button
                      key={color}
                      className='color'
                      style={{
                        background: styledColor,
                        borderBottomColor: darken(styledColor, 0.1),
                        opacity: !s.color || s.color === color ? 1 : 0.2,
                      }}
                      onClick={(): any => {
                        if (s.color === color) s.color = undefined;
                        else s.color = color;
                      }}
                    />
                  );
                })}
              </div>
            </main>

            <footer>
              <button>Cancel</button>
              <button
                disabled={submitDisabled}
                onClick={handleSubmitButtonClick}
              >
                {s.creatingPlayer && (
                  <>
                    <span className='loading'>⏳</span>{' '}
                  </>
                )}
                Create
              </button>
            </footer>
          </article>
        </Container>
      )}
    </Context.Provider>
  );
};