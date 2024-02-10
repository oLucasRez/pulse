import { useCallback, useEffect } from 'react';

import { Color } from '@domain/enums';

import {
  CreatePlayerModalHookProps,
  CreatePlayerModalHookReturn,
} from './types';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases, usePlayerUsecases } from '@presentation/contexts';

import { darken, getColor } from '@presentation/styles/mixins';

import { mapEnum } from '@domain/utils';
import { alertError, logError } from '@presentation/utils';

import { Container } from './styles';

export function useCreatePlayerModal(
  props: CreatePlayerModalHookProps = {},
): CreatePlayerModalHookReturn {
  const { unclosable, open = false, onSuccess } = props;

  const s = useStates({
    open,
    name: '',
    color: undefined as Color | undefined,
    creatingPlayer: false,
  });

  const creatingPlayer = (): any => (s.creatingPlayer = true);
  const createdPlayer = (): any => (s.creatingPlayer = false);

  const openCreatePlayerModal = useCallback(() => (s.open = true), [s.open]);

  const closeModal = (): any => (s.open = false);

  const { getMe } = useAuthUsecases();

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
      .then(onSuccess)
      .then(closeModal)
      .catch(alertError)
      .finally(createdPlayer);
  }

  return {
    openCreatePlayerModal,
    renderCreatePlayerModal: () => (
      <>
        {s.open && (
          <Container>
            <article
              className='modal'
              onClick={(e): any => e.stopPropagation()}
            >
              <header>
                <h2>Create player</h2>
                {!unclosable && <button onClick={closeModal}>x</button>}
              </header>

              <main>
                <input
                  autoFocus
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
                {!unclosable && <button onClick={closeModal}>Cancel</button>}
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
      </>
    ),
  };
}
