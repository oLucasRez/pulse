import { ReactNode, useCallback } from 'react';

import { Color } from '@domain/enums';
import { UnknownError } from '@domain/errors';
import { SubjectModel } from '@domain/models';
import { enumToArray } from '@domain/utils';

import { usePlayerUsecases, useSubjectUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { darken, getColor } from '@presentation/styles/mixins';
import { alertError, getRandomEmoji } from '@presentation/utils';

import { Container } from './styles';

import {
  MutateSubjectModalHookProps,
  MutateSubjectModalHookReturn,
} from './types';

export function useMutateSubjectModal(
  props: MutateSubjectModalHookProps = {},
): MutateSubjectModalHookReturn {
  const {
    unclosable,
    open = false,
    subject,
    position = null,
    onSuccess,
  } = props;

  const { mySubject, createMySubject, createSubject, changeSubject } =
    useSubjectUsecases();

  const { myPlayer } = usePlayerUsecases();

  const [s, set] = useStates({
    isMyFirstSubject: !mySubject,
    open,
    subject,
    description: subject?.description ?? '',
    color: mySubject ? subject?.color : myPlayer?.color,
    icon: getRandomEmoji([
      'Smileys & Emotion',
      'People & Body',
      'Animals & Nature',
      'Food & Drink',
      'Travel & Places',
      'Activites',
      'Objects',
    ]),
    mutatingSubject: false,
  });

  const openMutateSubjectModal = useCallback(
    (subject?: SubjectModel) => {
      s.open = true;
      s.subject = subject;
      s.description = subject?.description ?? '';
      s.color = subject?.color;

      if (s.isMyFirstSubject) s.color = myPlayer?.color;
    },
    [s.isMyFirstSubject],
  );

  const closeModal = (): any => {
    s.open = false;
    s.subject = undefined;
    s.description = '';
    s.color = undefined;
    s.mutatingSubject = false;
  };

  const submitDisabled =
    !s.description || !s.color || !s.icon || s.mutatingSubject;

  function handleSubmitButtonClick(): any {
    const { description, color, icon } = s;

    if (!description || !color || !icon) return;

    set('mutatingSubject')(true);

    let promise: Promise<SubjectModel>;

    if (s.subject && position)
      promise = changeSubject(s.subject.id, { description, position });
    else if (!s.isMyFirstSubject && position)
      promise = createSubject({ color, description, icon, position });
    else if (s.isMyFirstSubject)
      promise = createMySubject({ description, icon });
    else throw new UnknownError('Unknown state');

    promise
      .then(onSuccess)
      .then(closeModal)
      .catch(alertError)
      .finally(set('mutatingSubject', false));
  }

  function renderColors(): ReactNode {
    if (s.isMyFirstSubject) return;

    return (
      <div className='colors'>
        {enumToArray(Color).map((color) => {
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
    );
  }

  const title = s.subject ? 'Edit subject' : 'Create subject';
  const submitButtonText = s.subject ? 'Edit' : 'Create';

  return {
    openMutateSubjectModal,
    renderMutateSubjectModal: () => (
      <>
        {s.open && (
          <Container>
            <article
              className='modal'
              onClick={(e): any => e.stopPropagation()}
            >
              <header>
                <h2>{title}</h2>
                {!unclosable && <button onClick={closeModal}>x</button>}
              </header>

              <main>
                <div
                  className='icon'
                  style={{
                    background: s.color ? getColor(s.color) : 'lightgray',
                  }}
                >
                  {s.icon}
                </div>

                <input
                  autoFocus
                  className='description'
                  placeholder='Description'
                  defaultValue={s.description}
                  onChange={(e): any => (s.description = e.target.value)}
                />

                {renderColors()}
              </main>

              <footer>
                {!unclosable && <button onClick={closeModal}>Cancel</button>}
                <button
                  disabled={submitDisabled}
                  onClick={handleSubmitButtonClick}
                >
                  {s.mutatingSubject && (
                    <>
                      <span className='loading'>⏳</span>{' '}
                    </>
                  )}
                  {submitButtonText}
                </button>
              </footer>
            </article>
          </Container>
        )}
      </>
    ),
  };
}
