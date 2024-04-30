import { FC, Fragment, KeyboardEvent, useMemo } from 'react';

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
  const { id, description, color, votes, factID, authorID, onAnswer } = props;

  const [s, set] = useStates({
    active: false,
    answerDescription: '',
  });

  const { openBakingPaper, closeBakingPaper } = useMapContext();
  const { myPlayer, currentPlayer, players } = usePlayer();
  const { answers } = useAnswer();
  const { voteQuestionFact } = useQuestion();

  const myVote = myPlayer && votes[myPlayer.id];

  const author = useMemo(
    () => players.find(({ id }) => id === authorID) ?? null,
    [players, authorID],
  );

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

    const fact = answers.find(({ id }) => id === factID) ?? null;

    return (
      <>
        {fact && (
          <>
            {!!questionAnswers.length && (
              <p
                className='handwriting'
                style={{
                  fontSize: '0.75rem',
                  opacity: 0.75,
                  width: '100%',
                  maxWidth: '30rem',
                  marginBottom: '-0.5rem',
                }}
              >
                Fato
              </p>
            )}

            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <StarCheckbox
                checked={myVote?.answerID === fact.id}
                expired={!myVote?.upToDate}
                color={fact.color}
                onCheck={handleVoteClick(fact.id)}
              />

              <P
                // style
                className='handwriting'
                style={{
                  color: getColor(fact.color),
                  transform: 'translateY(0.05rem)',
                  border: `2px solid ${getColor(fact.color)}88`,
                  borderRadius: '50%',
                  padding: '0.5rem 1rem',
                  margin: '-0.5rem -1rem',
                }}
              >
                {fact.description}
              </P>
            </div>

            {author && (
              <span
                className='handwriting'
                style={{
                  color: getColor(fact.color),
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                  lineHeight: 1,
                  marginTop: '-0.125rem',
                  textAlign: 'end',
                }}
              >
                {players.map(({ color, id }) => (
                  <span
                    key={id}
                    style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      marginRight: '0.5rem',
                      borderRadius: '50rem',
                      background: getColor(color),
                    }}
                  />
                ))}
                — {author.name}
              </span>
            )}
          </>
        )}

        {!!questionAnswers.length && (
          <p
            className='handwriting'
            style={{
              fontSize: '0.75rem',
              opacity: 0.75,
              width: '100%',
              maxWidth: '30rem',
              marginBottom: '-0.5rem',
            }}
          >
            Conjecturas
          </p>
        )}

        {!!questionAnswers.length && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            {questionAnswers.map((answer) => {
              if (factID === answer.id) return null;

              const author =
                players.find(({ id }) => id === answer.authorID) ?? null;

              const votesColors = players.filter(
                ({ id }) => votes[id]?.answerID === answer.id,
              );

              return (
                <Fragment key={answer.id}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                    }}
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
                        textDecoration:
                          factID === answer.id ? 'underline' : undefined,
                        transform: 'translateY(0.05rem)',
                      }}
                    >
                      {answer.description}
                    </P>
                  </div>

                  {author && (
                    <span
                      className='handwriting'
                      style={{
                        color: getColor(answer.color),
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                        lineHeight: 1,
                        marginTop: '-0.125rem',
                        textAlign: 'end',
                      }}
                    >
                      {votesColors.map(({ color, id }) => (
                        <span
                          key={id}
                          style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            marginRight: '0.5rem',
                            borderRadius: '50rem',
                            background: getColor(color),
                          }}
                        />
                      ))}
                      — {author.name}
                    </span>
                  )}
                </Fragment>
              );
            })}

            {!!questionAnswers.length && (
              <div
                style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                <StarCheckbox
                  checked={myVote?.answerID === null}
                  expired={!myVote?.upToDate}
                  onCheck={handleVoteClick(null)}
                />

                <P
                  // style
                  className='handwriting'
                  style={{
                    opacity: 0.75,
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    transform: 'translateY(0.05rem)',
                  }}
                >
                  Nenhuma resposta é satisfatória
                </P>
              </div>
            )}
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
      <>
        <p
          className='handwriting'
          style={{
            fontSize: '0.75rem',
            opacity: 0.75,
            width: '100%',
            maxWidth: '30rem',
            marginBottom: '-0.5rem',
          }}
        >
          Nova Conjectura
        </p>

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
          placeholder='Descreva...'
          // handle
          onChange={set('answerDescription')}
          onKeyDown={handleInputKeyDown}
        />
      </>
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
                gap: '1rem',
              }}
              // handle
              onClick={(e) => e.stopPropagation()}
            >
              <label
                className='handwriting'
                style={{
                  width: '100%',
                  maxWidth: '30rem',
                  marginBottom: '-0.5rem',
                }}
              >
                Investigação{' '}
                {author && (
                  <>
                    (aberta por{' '}
                    {
                      <em
                        className='handwriting'
                        style={{ color: getColor(author.color) }}
                      >
                        {myPlayer?.id === author.id ? 'Você' : author.name}
                      </em>
                    }
                    )
                  </>
                )}
              </label>

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
