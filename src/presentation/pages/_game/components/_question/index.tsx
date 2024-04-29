import { FC, KeyboardEvent } from 'react';

import { Input, P } from '@presentation/components';
import {
  useAnswer,
  usePlayer,
  useQuestion,
  useStates,
} from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { alertError } from '@presentation/utils';

import { StarCheckbox } from './components';

import { QuestionProps, QuestionsProps } from './types';

import { Landmark, useMapContext } from '..';

export const Question: FC<QuestionProps> = (props) => {
  const { id, description, color, votes, factID, onAnswer } = props;

  const [s, set] = useStates({
    active: false,
    answerDescription: '',
  });

  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { myPlayer, currentPlayer } = usePlayer();
  const { answers } = useAnswer();
  const { voteQuestionFact } = useQuestion();

  const myVote = myPlayer && votes[myPlayer.id];

  function handleVoteClick(answerID: string | null) {
    return () => {
      voteQuestionFact(id, answerID).catch(alertError);
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
    const questionAnswers = answers
      .filter(({ questionID }) => questionID === id)
      .sort(
        (answer1, answer2) =>
          answer1.createdAt.getTime() - answer2.createdAt.getTime(),
      );

    return (
      <>
        {questionAnswers.map((answer) => (
          <div
            key={answer.id}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            <StarCheckbox
              checked={myVote?.answerID === answer.id}
              expired={!myVote?.upToDate}
              color={answer.color}
              onCheck={handleVoteClick(answer.id)}
            />

            <P
              // style
              className='handwriting'
              style={{
                color: getColor(answer.color),
                textDecoration: factID === answer.id ? 'underline' : undefined,
              }}
            >
              {answer.description}
            </P>
          </div>
        ))}

        {!!questionAnswers.length && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <StarCheckbox
              checked={myVote?.answerID === null}
              expired={!myVote?.upToDate}
              onCheck={handleVoteClick(null)}
            />

            <P
              // style
              className='handwriting'
              style={{
                color: getColor(),
                fontSize: '0.75rem',
              }}
            >
              None of the answers
            </P>
          </div>
        )}
      </>
    );
  }

  function renderAnswerInput() {
    if (!onAnswer) return null;
    if (!myPlayer) return null;
    if (factID) return null;

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
