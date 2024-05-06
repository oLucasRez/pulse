import { FC, KeyboardEvent } from 'react';

import { Input } from '@presentation/components';
import { useAvailableColors, useStates } from '@presentation/hooks';
import { darken, getColor } from '@presentation/styles/mixins';
import { getRandomEmoji } from '@presentation/utils';

import { FormData as SubjectFormFormData, SubjectFormProps } from './types';

export const SubjectForm: FC<SubjectFormProps> = ({
  defaultValues,
  hidden,
  onSubmit,
}) => {
  const [s, set] = useStates({
    color: defaultValues?.color,
    icon:
      defaultValues?.icon ??
      getRandomEmoji([
        'Smileys & Emotion',
        'People & Body',
        'Animals & Nature',
        'Food & Drink',
        'Travel & Places',
        'Activites',
        'Objects',
      ]),
    description: defaultValues?.description ?? '',
  });

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    if (!s.color || !s.icon || !s.description) return;

    onSubmit?.({ color: s.color, icon: s.icon, description: s.description });
  }

  const availableColors = useAvailableColors();

  function renderColors() {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {availableColors.map((color) => {
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
      {!hidden?.icon && (
        <div
          style={{
            fontSize: '2.5rem',
            lineHeight: 1,
          }}
        >
          {s.icon}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label
          className='handwriting'
          style={{
            marginBottom: '0.25rem',
            opacity: 0.75,
          }}
        >
          <em className={s.color}>Seu</em> Elemento
        </label>

        {!hidden?.description && (
          <Input
            // style
            style={{ fontSize: '1.5rem', color: getColor(s.color) }}
            autoFocus
            variant='baking-paper'
            placeholderOpacity={0.5}
            placeholderColor={getColor(s.color)}
            // params
            placeholder='Descreva...'
            defaultValue={s.description}
            // handle
            onChange={set('description')}
            onKeyDown={handleInputKeyDown}
          />
        )}

        {!hidden?.color && renderColors()}
      </div>
    </div>
  );
};

export namespace SubjectForm {
  export type FormData = SubjectFormFormData;
}
