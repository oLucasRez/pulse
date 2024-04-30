import { FC, Fragment, KeyboardEvent } from 'react';

import { Input } from '@presentation/components';
import { useStates, useSubject } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import {
  FormData as CentralFactFormFormData,
  CentralFactFormProps,
} from './types';

export const CentralFactForm: FC<CentralFactFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { mySubject, otherSubjects } = useSubject();

  const [s, set] = useStates({
    description: defaultValues?.description ?? '',
  });

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    if (!s.description) return;

    onSubmit?.({ description: s.description });
  }

  return (
    <div
      // style
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '3rem',
      }}
    >
      <p
        className='handwriting'
        style={{
          fontSize: '0.75rem',
          opacity: 0.75,
          width: '100%',
          maxWidth: '30rem',
        }}
      >
        Contribua para o Fato Central da história. Descreva uma parte do cenário
        final, citando seu próprio elemento
        {mySubject && (
          <>
            {' '}
            (
            <em
              className='handwriting'
              style={{ color: getColor(mySubject.color) }}
            >
              {mySubject.icon} {mySubject.description}
            </em>
            )
          </>
        )}{' '}
        e relacionando-o a outro
        {!!otherSubjects.length && (
          <>
            {' '}
            (
            {otherSubjects.map(({ id, icon, description, color }, i) => (
              <Fragment key={id}>
                <em className='handwriting' style={{ color: getColor(color) }}>
                  {icon} {description}
                </em>
                {i === otherSubjects.length - 1 ? '' : ', '}
              </Fragment>
            ))}
            )
          </>
        )}
        .
      </p>

      <label
        className='handwriting'
        style={{
          width: '100%',
          maxWidth: '30rem',
          marginBottom: '-0.5rem',
        }}
      >
        Fato Central
      </label>

      <Input
        // style
        style={{
          fontSize: '1.5rem',
          color: getColor(),
          minHeight: '2rem',
          width: '100%',
          maxWidth: '30rem',
          lineHeight: 1.2,
        }}
        autoFocus
        variant='baking-paper'
        placeholderOpacity={0.5}
        placeholderColor={getColor()}
        // params
        placeholder='Description'
        defaultValue={s.description}
        // handle
        onChange={set('description')}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export namespace CentralFactForm {
  export type FormData = CentralFactFormFormData;
}
