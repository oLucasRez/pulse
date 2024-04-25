import { FC } from 'react';

import { useAnswer, useGame, usePlayer, useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  AnswerEvent,
  CentralFact,
  Dices,
  Map,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

export const CreatingAnswersState: FC = () => {
  const [s, set] = useStates({
    creatingAnswer: false,
  });

  const { currentGame } = useGame();
  const { isMyTurn, currentPlayer } = usePlayer();
  const { createAnswer } = useAnswer();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  function handleAnswer(event: AnswerEvent) {
    if (!currentPlayer) return;

    s.creatingAnswer = true;
    createAnswer({
      questionID: event.question.id,
      description: event.description,
    })
      .catch(alertError)
      .finally(set('creatingAnswer', false));
  }

  const onAnswer =
    state === 'create:answer' && isMyTurn ? handleAnswer : undefined;

  if (!currentGame) return null;

  return (
    <>
      <Map>
        <Pulses />
        <Dices transparent />
        <Subjects />
        <CentralFact />
        <Questions onAnswer={onAnswer} />
      </Map>

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing an answer...
        </p>
      )}
    </>
  );
};
