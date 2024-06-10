import { FC, useEffect, useRef } from 'react';

import {
  BakingPaper,
  Button,
  Icon,
  IconButton,
  Input,
} from '@presentation/components';
import {
  useCentralFact,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
} from '@presentation/hooks';

import { useTipToast } from './hooks';

import { Buttons, Content } from './styles';

const CentralFactPage: FC = () => {
  const [s, set] = useStates({
    editMode: false,
    loading: false,
    description: '',
  });

  const { centralFact, changeCentralFact } = useCentralFact();
  const { currentGame } = useGame();
  const { isMyTurn } = usePlayer();

  const [state, subState] = currentGame?.state ?? [];

  const { navigateToGame } = useNavigate();

  const isChangingCentralFact =
    state === 'creating:centralFact' &&
    subState === 'change:centralFact' &&
    isMyTurn;

  function handleSubmit() {
    if (isChangingCentralFact) {
      if (!s.description) return;

      s.loading = true;

      changeCentralFact({ description: s.description })
        .finally(navigateToGame)
        .finally(set('loading', false));

      return;
    }

    s.loading = true;

    changeCentralFact({ description: s.description })
      .finally(set('editMode', false))
      .finally(set('loading', false));
  }

  const descriptionRef = useRef<Input.Element>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isChangingCentralFact) s.editMode = true;
  }, [isChangingCentralFact]);

  useTipToast();

  const showCancelButton = subState !== 'change:centralFact';

  const showEditButton = !s.editMode;

  const cancelDisabled = s.loading;
  const submitDisabled = !s.description || s.loading;

  return (
    <BakingPaper
      onClick={() => {
        if (isChangingCentralFact) return;

        navigateToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Input
          // style
          variant='baking-paper'
          // params
          ref={descriptionRef}
          id='description'
          placeholder='Descreva...'
          label='Fato Central'
          defaultValue={centralFact?.description}
          value={centralFact?.description}
          disabled={!s.editMode}
          // handle
          onChange={set('description')}
        />

        {s.editMode && (
          <Buttons>
            {showCancelButton && (
              <Button
                disabled={cancelDisabled}
                onClick={set('editMode', false)}
              >
                Cancelar
              </Button>
            )}

            <Button
              disabled={submitDisabled}
              loading={s.loading}
              onClick={handleSubmit}
            >
              Editar
            </Button>
          </Buttons>
        )}

        {showEditButton && (
          <IconButton
            className='edit'
            icon={<Icon.Pencil />}
            size='small'
            onClick={set('editMode', true)}
          />
        )}
      </Content>
    </BakingPaper>
  );
};

export default CentralFactPage;
