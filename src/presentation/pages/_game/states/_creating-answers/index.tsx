import { FC } from 'react';

import {
  useAnswerUsecases,
  useGameUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  AnswerEvent,
  CentralFact,
  Dices,
  Map,
  PlayersList,
  Pulses,
  Questions,
  Subjects,
} from '../../components';

export const CreatingAnswersState: FC = () => {
  const [s, set] = useStates({
    creatingAnswer: false,
  });

  const { currentGame } = useGameUsecases();
  const { isMyTurn, currentPlayer } = useRoundUsecases();
  const { createAnswer } = useAnswerUsecases();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  function handleAnswer(event: AnswerEvent) {
    if (!currentPlayer) return;

    s.creatingAnswer = true;
    createAnswer({
      description: event.description,
      questionID: event.question.id,
      authorID: currentPlayer.id,
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

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing an answer...
        </p>
      )}
    </>
  );
};
