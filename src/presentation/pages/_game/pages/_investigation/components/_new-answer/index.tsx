import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input } from '@presentation/components';
import {
  useAnswer,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useToast,
} from '@presentation/hooks';

import { useTipToast } from './hooks';

export const NewAnswer = () => {
  const [s, set] = useStates({
    description: '',
    loading: false,
  });

  const { currentGame } = useGame();
  const { currentPlayer, isMyTurn } = usePlayer();
  const { createAnswer } = useAnswer();

  const isCreatingAnswerState =
    currentGame?.state[0] === 'creating:answers' &&
    currentGame.state[1] === 'create:answer' &&
    isMyTurn;

  const { navigateToGame } = useNavigate();

  const params = useParams();

  const toast = useToast();

  function handleSubmit() {
    if (!s.description || !params.questionID) return;

    s.loading = true;

    createAnswer({
      questionID: params.questionID,
      description: s.description,
    })
      .catch(toast.error)
      .finally(navigateToGame)
      .finally(set('loading', false));
  }

  useTipToast();

  const descriptionRef = useRef<Input.Element>(null);
  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  const submitDisabled = !s.description;

  if (!isCreatingAnswerState) return null;

  return (
    <>
      <Input
        ref={descriptionRef}
        className='answer-description'
        variant='baking-paper'
        label='Nova Conjectura'
        placeholder='Descreva...'
        color={currentPlayer?.color}
        disabled={!isCreatingAnswerState}
        onChange={set('description')}
      />

      <Button
        className='answer-submit'
        color={currentPlayer?.color}
        disabled={submitDisabled}
        loading={s.loading}
        onClick={handleSubmit}
      >
        Responder
      </Button>
    </>
  );
};
