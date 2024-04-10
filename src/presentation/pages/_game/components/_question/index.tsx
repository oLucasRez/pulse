import { FC, useMemo } from 'react';

import { AnswerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { Input, P, Text, Transition } from '@presentation/components';
import { usePlayerUsecases, useQuestionUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { getColor } from '@presentation/styles/mixins';
import { beginPath } from '@presentation/utils';

import { QuestionProps } from './types';

import { useMapContext } from '..';

const descriptionOffset = new Vector([-50, -50]);

export const Question: FC<QuestionProps> = (props) => {
  const { description, authorID } = props;

  const [s, set] = useStates({
    active: false,
  });

  const { mapSpace, openPortal, closePortal } = useMapContext();
  const { players, myPlayer } = usePlayerUsecases();

  const color = useMemo(
    () =>
      (authorID && players.find((value) => value.id === authorID)?.color) ||
      null,
    [authorID, players],
  );

  const answers = useMemo<AnswerModel[]>(() => [], []);

  if (!color) return null;

  const position = mapSpace.mult(props.position);
  const descriptionPosition = position.sum(descriptionOffset);

  return (
    <>
      <Transition.Fade active={s.active} ms={200}>
        <g>
          <path
            // style
            fill='none'
            stroke={getColor(color)}
            strokeWidth={2}
            strokeLinecap='round'
            // params
            d={beginPath()
              .moveTo(position)
              .bezierCurveTo(
                descriptionOffset.projX().mult(0.5),
                descriptionOffset.mult(new Vector([1, 0.5])),
                descriptionOffset,
              )
              .toString()}
          />
          <circle
            // style
            fill={getColor(color)}
            // params
            cx={descriptionPosition.x}
            cy={descriptionPosition.y}
            r={3}
          />
          <P
            // style
            className='handwriting'
            strokeWidth={3}
            stroke='white'
            style={{
              position: 'absolute',
              left: descriptionPosition.x,
              top: descriptionPosition.y,
              color: getColor(color),
              maxWidth: '17.5ch',
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              transform: 'translateY(-100%)',
            }}
          >
            {description}
          </P>
        </g>
      </Transition.Fade>

      <Transition.Scale active={s.active} activeFactor={1.3} ms={100}>
        <Text
          // style
          className='handwriting'
          textAnchor='middle'
          alignmentBaseline='middle'
          cursor='pointer'
          fill={getColor(color)}
          stroke='white'
          strokeWidth={3}
          // params
          x={position.x}
          y={position.y}
          // handle
          onMouseEnter={set('active', true)}
          onMouseOut={set('active', false)}
          onClick={() =>
            openPortal(
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
                onClick={closePortal}
              >
                <div
                  // style
                  style={{
                    padding: '2rem',
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
                  {answers.map((answer) => {
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
                  })}
                  <Input
                    className='handwriting'
                    placeholder='Responder...'
                    placeholderColor={
                      myPlayer ? getColor(myPlayer.color) : undefined
                    }
                    placeholderOpacity={0.6}
                    style={{
                      color: myPlayer ? getColor(myPlayer.color) : undefined,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      outline: 'none',
                    }}
                  />
                </div>
              </div>,
            )
          }
        >
          ?
        </Text>
      </Transition.Scale>
    </>
  );
};

export const Questions: FC = () => {
  const { questions } = useQuestionUsecases();

  return (
    <>
      {questions.map((question) => (
        <Question key={question.id} {...question} />
      ))}
    </>
  );
};
