import { FC, KeyboardEvent } from 'react';

import { Input } from '@presentation/components';
import { useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { FormData as QuestionFormFormData, QuestionFormProps } from './types';

export const QuestionForm: FC<QuestionFormProps> = ({ color, onSubmit }) => {
  const [s, set] = useStates({
    description: '',
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
      <label
        className='handwriting'
        style={{
          width: '100%',
          maxWidth: '30rem',
          marginBottom: '-0.5rem',
        }}
      >
        Investigação
      </label>

      <Input
        // style
        style={{
          fontSize: '1.5rem',
          color: getColor(color),
          minHeight: '2rem',
          width: '100%',
          maxWidth: '30rem',
          lineHeight: 1.2,
        }}
        autoFocus
        variant='baking-paper'
        placeholderOpacity={0.5}
        placeholderColor={getColor(color)}
        // params
        placeholder='Descreva...'
        defaultValue={s.description}
        // handle
        onChange={set('description')}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  );
};

export namespace QuestionForm {
  export type FormData = QuestionFormFormData;
}
