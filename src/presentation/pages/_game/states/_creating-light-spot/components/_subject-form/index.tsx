import { FC, KeyboardEvent } from 'react';

import { Color } from '@domain/enums';
import { enumToArray } from '@domain/utils';

import { Input } from '@presentation/components';
import { useStates } from '@presentation/hooks';
import { darken, getColor } from '@presentation/styles/mixins';
import { getRandomEmoji } from '@presentation/utils';

import { FormData as SubjectFormFormData, SubjectFormProps } from './types';

export const SubjectForm: FC<SubjectFormProps> = ({ onSubmit }) => {
  const [s, set] = useStates({
    color: undefined as Color | undefined,
    icon: getRandomEmoji([
      'Smileys & Emotion',
      'People & Body',
      'Animals & Nature',
      'Food & Drink',
      'Travel & Places',
      'Activites',
      'Objects',
    ]),
    description: '',
  });

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    if (!s.color || !s.icon || !s.description) return;

    onSubmit?.({ color: s.color, icon: s.icon, description: s.description });
  }

  function renderColors() {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {enumToArray(Color).map((color) => {
          const styledColor = getColor(color);

          return (
            <button
              key={color}
              style={{
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50rem',
                background: styledColor,
                borderBottomColor: darken(styledColor, 0.1),
                opacity: !s.color || s.color === color ? 1 : 0.2,
              }}
              onClick={() => {
                if (s.color === color) s.color = undefined;
                else s.color = color;
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      // style
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          background: s.color ? getColor(s.color) : 'lightgray',
        }}
      >
        {s.icon}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Input
          // style
          style={{ fontSize: '1.5rem', color: getColor(s.color) }}
          autoFocus
          variant='baking-paper'
          placeholderOpacity={0.5}
          placeholderColor={getColor(s.color)}
          // params
          placeholder='Description'
          defaultValue={s.description}
          // handle
          onChange={set('description')}
          onKeyDown={handleInputKeyDown}
        />

        {renderColors()}
      </div>
    </div>
  );
};

export namespace SubjectForm {
  export type FormData = SubjectFormFormData;
}
