import { FC, Fragment, KeyboardEvent } from 'react';

import { Input, P } from '@presentation/components';
import {
  useAnswer,
  usePlayer,
  useQuestion,
  useStates,
} from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { QuestionProps, QuestionsProps } from './types';

import { Landmark, useMapContext } from '..';

export const Question: FC<QuestionProps> = (props) => {
  const { id, description, color, solved, onAnswer } = props;

  const [s, set] = useStates({
    active: false,
    answerDescription: '',
  });

  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { myPlayer, currentPlayer } = usePlayer();
  const { answers, pendingMyVote, voteAnswer } = useAnswer();

  function handleVoteClick(value: boolean) {
    return () => {
      voteAnswer(value).catch(alertError);
      closeBakingPaper();
    };
  }

  function handleInputKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.shiftKey) return;
    if (!currentPlayer) return;
    if (!s.answerDescription) return;

    onAnswer?.({ question: props, description: s.answerDescription });
    closeBakingPaper();
  }

  function renderAnswers() {
    return answers
      .filter(({ questionID }) => questionID === id)
      .map((answer) => (
        <Fragment key={answer.id}>
          <P
            // style
            className='handwriting'
            style={{
              color: getColor(answer.color),
              textDecoration: answer.state === 'fact' ? 'underline' : undefined,
            }}
          >
            {answer.description}
          </P>

          {answer.state === 'voting' && pendingMyVote && (
            <P className='handwriting' style={{ fontSize: '0.75rem' }}>
              {'('} Turn in fact?{' '}
              <button
                // style
                className='handwriting'
                style={{ fontSize: '0.75rem' }}
                // handle
                onClick={handleVoteClick(true)}
              >
                Yes
              </button>{' '}
              <button
                // style
                className='handwriting'
                style={{ fontSize: '0.75rem' }}
                // handle
                onClick={handleVoteClick(false)}
              >
                No
              </button>{' '}
              {')'}
            </P>
          )}
        </Fragment>
      ));
  }

  function renderAnswerInput() {
    if (!onAnswer) return null;
    if (!myPlayer) return null;
    if (solved) return null;

    return (
      <Input
        // style
        variant='baking-paper'
        className='handwriting'
        placeholderColor={getColor(myPlayer.color)}
        placeholderOpacity={0.6}
        style={{
          color: getColor(myPlayer.color),
          background: 'none',
          border: 'none',
          padding: 0,
          outline: 'none',
        }}
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
      {...props}
      symbol='?'
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
  const { questions } = useQuestion();

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id} {...question} {...props} />
      ))}
    </>
  );
};

export { AnswerEvent, VoteEvent } from './types';
