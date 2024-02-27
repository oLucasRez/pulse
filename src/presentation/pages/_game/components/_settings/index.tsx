import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { SettingsFieldValues, SettingsProps } from './types';

import { useStates } from '@presentation/hooks';

import { useGameUsecases } from '@presentation/contexts';

import { Container } from './styles';

import { alertError } from '@presentation/utils';

import { useGameLoaderData } from '../../loader';

export const Settings: FC<SettingsProps> = (props) => {
  const { onClose } = props;

  const [s, set] = useStates({
    changingGame: false,
  });

  const { changeGame } = useGameUsecases();

  const currentGame = useGameLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<SettingsFieldValues>({
    defaultValues: {
      title: currentGame.title ?? undefined,
      maxPlayers: Number(currentGame.config.maxPlayers),
      withLightspot: currentGame.config.withLightspot,
      dicesMode: currentGame.config.dicesMode,
    },
  });

  const maxPlayers = watch('maxPlayers');

  function onSubmit(data: SettingsFieldValues): any {
    set('changingGame')(true);

    changeGame
      .execute({
        title: data.title,
        config: {
          maxPlayers: data.maxPlayers,
          withLightspot: data.withLightspot,
          dicesMode: data.dicesMode,
        },
      })
      .then(onClose)
      .catch(alertError)
      .finally(set('changingGame', false));
  }

  const registerDicesMode = register('dicesMode', { required: true });

  return (
    <Container>
      <h2>
        Configurações
        {onClose && (
          <button onClick={onClose}>
            <span className='emoji'>✖️</span>
          </button>
        )}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='title'>Title</label>
        <input
          {...register('title', { required: true })}
          id='title'
          type='text'
        />

        <label htmlFor='maxPlayers'>Max Players</label>
        <div className='maxPlayers'>
          <input
            {...register('maxPlayers', { required: true })}
            id='maxPlayers'
            type='range'
            min={3}
            max={5}
            step={1}
          />
          <span>{maxPlayers}</span>
        </div>

        <label htmlFor='withLightspot'>With Lightspot</label>
        <input
          {...register('withLightspot')}
          id='withLightspot'
          type='checkbox'
        />

        <label htmlFor='dicesMode'>Dices Mode</label>
        <div className='dicesMode'>
          <input
            {...registerDicesMode}
            id='dicesModeEqual'
            type='radio'
            value='equal'
          />
          <label htmlFor='dicesModeEqual'>Equal</label>
        </div>
        <div className='dicesMode'>
          <input
            {...registerDicesMode}
            id='dicesModeGrowing'
            type='radio'
            value='growing'
          />
          <label htmlFor='dicesModeGrowing'>Growing</label>
        </div>

        <button type='submit' disabled={s.changingGame || !isValid}>
          {s.changingGame ? <span className='emoji loading'>⏳</span> : 'Save'}
        </button>
      </form>
    </Container>
  );
};
