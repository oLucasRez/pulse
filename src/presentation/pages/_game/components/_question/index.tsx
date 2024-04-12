import { FC, KeyboardEvent, useMemo } from 'react';

import { Input, P } from '@presentation/components';
import {
  useAnswerUsecases,
  usePlayerUsecases,
  useQuestionUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';

import { QuestionProps, QuestionsProps } from './types';

import { Landmark, useMapContext } from '..';

export const Question: FC<QuestionProps> = (props) => {
  const { id, description, authorID, position, onAnswer } = props;

  const [s, set] = useStates({
    active: false,
    answerDescription: '',
    creatingAnswer: false,
  });

  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { players, myPlayer } = usePlayerUsecases();
  const { currentPlayer } = useRoundUsecases();
  const { answers } = useAnswerUsecases();

  const color = useMemo(
    () =>
      (authorID && players.find((value) => value.id === authorID)?.color) ||
      null,
    [authorID, players],
  );

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.shiftKey) return;
    if (!currentPlayer) return;
    if (!s.answerDescription) return;

    onAnswer?.({ question: props, description: s.answerDescription });
  }

  if (!color) return null;

  function renderAnswers() {
    return answers
      .filter(({ questionID }) => questionID === id)
      .map((answer) => {
        const color = players.find(
          (player) => player.id === answer.authorID,
        )?.color;

        return (
          <P
            key={answer.id}
            // style
            className='handwriting'
            style={{ color: color ? getColor(color) : undefined }}
          >
            {answer.description}
          </P>
        );
      });
  }

  function renderAnswerInput() {
    if (!onAnswer) return null;
    if (!myPlayer) return null;

    return (
      <Input
        // style
        multiline
        className='handwriting'
        placeholderColor={getColor(myPlayer.color)}
        placeholderOpacity={0.6}
        style={{
          color: getColor(myPlayer.color),
          background: 'none',
          border: 'none',
          padding: 0,
          width: '30rem',
          outline: 'none',
          borderRadius: 0,
        }}
        disabled={s.creatingAnswer}
        // params
        placeholder='Answer...'
        // handle
        onChange={set('answerDescription')}
        onKeyDown={handleInputKeyDown}
      />
    );
  }

  return (
    <Landmark
      description={description}
      position={position}
      symbol='?'
      color={color}
      onClick={() =>
        openBakingPaper(
          <div
            // style
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // handle
            onClick={closeBakingPaper}
          >
            <div
              // style
              style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '30rem',
                lineHeight: 1.1,
                gap: '0.6rem',
              }}
              // handle
              onClick={(e) => e.stopPropagation()}
            >
              <P
                // style
                className='handwriting'
                style={{ color: getColor(color), fontSize: '1.5rem' }}
              >
                {description}
              </P>
              {renderAnswers()}
              {renderAnswerInput()}
            </div>
          </div>,
        )
      }
    />
  );
};

export const Questions: FC<QuestionsProps> = (props) => {
  const { questions } = useQuestionUsecases();

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id} {...question} {...props} />
      ))}
    </>
  );
};

export { AnswerEvent, VoteEvent } from './types';
