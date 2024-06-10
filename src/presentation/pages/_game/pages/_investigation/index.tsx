import { FC, useEffect, useMemo, useRef } from 'react';

import {
  BakingPaper,
  Button,
  Icon,
  IconButton,
  Input,
} from '@presentation/components';
import {
  useAnswer,
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

import { Buttons, Content } from './styles';

const InvestigationPage: FC<QuestionExistsProxy.ChildrenProps> = ({
  question,
}) => {
  const newQuestion = !question;

  const [s, set] = useStates({
    editMode: newQuestion,
    description: question?.description,
    loading: false,
  });

  const { currentGame } = useGame();
  const { myPlayer, players, currentPlayer, isMyTurn } = usePlayer();
  const { createQuestion, editQuestion } = useQuestion();
  const { answers } = useAnswer();

  const { navigateToGame } = useNavigate();

  const isCreatingQuestionState =
    currentGame?.state[0] === 'creating:questions' &&
    currentGame.state[1] === 'create:question' &&
    isMyTurn;

  const author = players.find(({ id }) => id === question?.authorID) ?? null;

  const solver = useMemo(() => {
    const fact = answers.find(({ id }) => id === question?.factID);

    return players.find(({ id }) => id === fact?.authorID) || null;
  }, [answers, players]);

  const isMyQuestion = newQuestion || myPlayer?.id === author?.id;

  const color = newQuestion ? currentPlayer?.color : author?.color;

  useTipToast();

  const toast = useToast();

  useEffect(() => {
    if (!question) return;
    s.description = question.description;
  }, [question?.description, s.editMode]);

  function handleSubmit() {
    if (isCreatingQuestionState) {
      if (!s.description) return;

      s.loading = true;

      createQuestion({ description: s.description })
        .catch(toast.error)
        .finally(navigateToGame)
        .finally(set('loading', false));

      navigateToGame();

      return;
    }

    if (!question) return;

    s.loading = true;

    editQuestion(question.id, { description: s.description })
      .catch(toast.error)
      .finally(set('loading', false))
      .finally(set('editMode', false));
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
          {solver ? (
            <>
              , resolvida por{' '}
              <em className={solver.color}>
                {solver.id === myPlayer?.id ? 'você' : solver.name}
              </em>
            </>
          ) : (
            ''
          )}
          )
        </>
      )}
    </>
  );

  const descriptionInputDisabled = !s.editMode;

  const showCancelButton = !newQuestion;

  const showEditButton = isMyQuestion && !s.editMode;

  const cancelDisabled = s.loading;
  const submitDisabled =
    !s.description || s.loading || s.description === question?.description;

  const showAnswers = !!question;
  const showNewAnswer = !question?.factID;

  return (
    <BakingPaper
      onClick={() => {
        if (isCreatingQuestionState) return;

        navigateToGame();
      }}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Input
          // style
          className='question-description'
          color={color}
          variant='baking-paper'
          label={label}
          // params
          ref={descriptionRef}
          id='description'
          placeholder='Descreva...'
          disabled={descriptionInputDisabled}
          defaultValue={s.description}
          value={s.description}
          // handle
          onChange={set('description')}
        />

        {showEditButton && (
          <IconButton
            icon={<Icon.Pencil />}
            size='small'
            onClick={set('editMode', true)}
          />
        )}

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
              color={color}
              loading={s.loading}
              disabled={submitDisabled}
              onClick={handleSubmit}
            >
              {newQuestion ? 'Criar' : 'Editar'}
            </Button>
          </Buttons>
        )}

        {showAnswers && <Answers question={question} />}

        {showNewAnswer && <NewAnswer />}
      </Content>
    </BakingPaper>
  );
};

export default InvestigationPage;
