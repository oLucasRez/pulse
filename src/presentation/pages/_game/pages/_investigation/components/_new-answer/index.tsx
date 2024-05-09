import { KeyboardEvent, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Input } from '@presentation/components';
import {
  useAnswer,
  useGame,
  useNavigate,
  usePlayer,
  useStates,
  useToast,
} from '@presentation/hooks';

import { useTipToast } from './hooks';

import { Label } from '../../styles';
import { Description } from './styles';

export const NewAnswer = () => {
  const [s, set] = useStates({
    description: '',
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

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    if (!s.description || !params.questionID) return;

    createAnswer({
      questionID: params.questionID,
      description: s.description,
    }).catch(toast.error);

    navigateToGame();
  }

  useTipToast();

  const descriptionRef = useRef<Input.Element>(null);
  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  if (!isCreatingAnswerState) return null;

  return (
    <>
      <Label htmlFor='answer-description'>Nova Conjectura</Label>

      <Description
        ref={descriptionRef}
        id='answer-description'
        placeholder='Descreva...'
        color={currentPlayer?.color}
        disabled={!isCreatingAnswerState}
        onChange={set('description')}
        onKeyDown={handleInputKeyDown}
      />
    </>
  );
};
