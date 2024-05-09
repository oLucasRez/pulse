import { FC, KeyboardEvent, useEffect, useRef } from 'react';

import { Input } from '@presentation/components';
import {
  useGame,
  useNavigate,
  usePlayer,
  useQuestion,
  useStates,
  useToast,
} from '@presentation/hooks';

import { useTipToast } from './hooks';

import { Answers, NewAnswer } from './components';

import { QuestionExistsProxy } from './proxies';

import { Container } from '../styles';
import { Content, Description, Label } from './styles';

const InvestigationPage: FC<QuestionExistsProxy.ChildrenProps> = ({
  question,
}) => {
  const [s, set] = useStates({
    description: question?.description,
  });

  const { currentGame } = useGame();
  const { myPlayer, players, currentPlayer, isMyTurn } = usePlayer();
  const { createQuestion } = useQuestion();

  const { navigateToGame } = useNavigate();

  const isCreatingQuestionState =
    currentGame?.state[0] === 'creating:questions' &&
    currentGame.state[1] === 'create:question' &&
    isMyTurn;

  const author = players.find(({ id }) => id === question?.authorID) ?? null;

  const isNewQuestion = !question;

  const color = isNewQuestion ? currentPlayer?.color : author?.color;

  useTipToast();

  const toast = useToast();

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;

    if (isCreatingQuestionState) {
      if (!s.description) return;

      createQuestion({ description: s.description }).catch(toast.error);

      navigateToGame();
    }
  }

  const descriptionRef = useRef<Input.Element>(null);
  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  const label = (
    <>
      Investigação
      {author && (
        <>
          {' '}
          (aberta por{' '}
          <em className={author.color}>
            {author.id === myPlayer?.id ? 'você' : author.name}
          </em>
          )
        </>
      )}
    </>
  );

  const showAnswers = !!question;
  const showNewAnswer = !question?.factID;

  return (
    <Container
      onClick={() => {
        if (isCreatingQuestionState) return;

        navigateToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Label htmlFor='question-description'>{label}</Label>
        <Description
          ref={descriptionRef}
          id='question-description'
          placeholder='Descreva...'
          color={color}
          defaultValue={s.description}
          disabled={!isCreatingQuestionState}
          onChange={set('description')}
          onKeyDown={handleInputKeyDown}
        />

        {showAnswers && <Answers question={question} />}

        {showNewAnswer && <NewAnswer />}
      </Content>
    </Container>
  );
};

export default InvestigationPage;
