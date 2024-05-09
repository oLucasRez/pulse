import { FC, KeyboardEvent, useEffect, useRef } from 'react';

import { Input } from '@presentation/components';
import {
  useCentralFact,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
} from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { useTipToast } from './hooks';

import { Container } from '../styles';
import { Content, Description, Label } from './styles';

const CentralFactPage: FC = () => {
  const [s, set] = useStates({
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

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    if (isChangingCentralFact) {
      if (!s.description) return;

      changeCentralFact({ description: s.description }).finally(navigateToGame);
    }
  }

  const descriptionRef = useRef<Input.Element>(null);

  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  useTipToast();

  const disabled =
    !isMyTurn ||
    currentGame?.state[0] !== 'creating:centralFact' ||
    currentGame.state[1] !== 'change:centralFact';

  return (
    <Container
      onClick={() => {
        if (isChangingCentralFact) return;

        navigateToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Label>Fato Central</Label>
        <Description
          // style
          variant='baking-paper'
          placeholderOpacity={0.5}
          placeholderColor={getColor()}
          // params
          ref={descriptionRef}
          id='description'
          placeholder='Descreva...'
          defaultValue={centralFact?.description}
          disabled={disabled}
          // handle
          onChange={set('description')}
          onKeyDown={handleInputKeyDown}
        />
      </Content>
    </Container>
  );
};

export default CentralFactPage;
