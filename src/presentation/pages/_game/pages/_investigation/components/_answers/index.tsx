import { FC, useMemo } from 'react';

import { AnswerModel, PlayerModel } from '@domain/models';

import {
  useAnswer,
  usePlayer,
  useQuestion,
  useStates,
  useToast,
} from '@presentation/hooks';

import {
  Author,
  Container,
  Description,
  DescriptionInput,
  Label,
  StarCheckbox,
  Vote,
  Votes,
} from './styles';

import { AnswersProps } from './types';

export const Answers: FC<AnswersProps> = ({ question }) => {
  const { answers: allAnswers } = useAnswer();
  const { myPlayer, players } = usePlayer();
  const { voteQuestionFact } = useQuestion();

  const [s, set] = useStates({
    loading: false,
  });

  const myVote = myPlayer && question.votes[myPlayer.id];

  const checked = (value: string | null) => myVote?.answerID === value;
  const expired = !myVote?.upToDate;

  const conjectures = useMemo(
    () =>
      allAnswers
        .filter(
          ({ id, questionID }) =>
            id !== question.factID && questionID === question.id,
        )
        .sort(
          (answer1, answer2) =>
            answer1.createdAt.getTime() - answer2.createdAt.getTime(),
        ),
    [allAnswers, question.id],
  );

  const fact = useMemo(
    () => allAnswers.find(({ id }) => id === question.factID) ?? null,
    [allAnswers, question.factID],
  );

  const toast = useToast();

  if (!conjectures.length && !fact) return null;

  function handleVote(value: string | null) {
    return () => {
      s.loading = true;
      voteQuestionFact(question.id, value)
        .catch(toast.error)
        .finally(set('loading', false));
    };
  }

  function renderAnswer({ id, description, color, authorName }: AnswerModel) {
    const isFact = fact?.id === id;

    const votingPlayers: PlayerModel[] = [];
    Object.entries(question.votes).map(([playerID, { answerID }]) => {
      if (answerID !== id) return;

      const player = players.find(({ id }) => id === playerID);

      if (player) votingPlayers.push(player);
    });

    return (
      <Container key={id}>
        <StarCheckbox
          $checked={checked(id)}
          $expired={expired}
          $loading={s.loading}
          $color={color}
          onClick={handleVote(id)}
        />
        <DescriptionInput
          disabled
          defaultValue={description}
          $color={color}
          $fact={isFact}
        />
        <Votes>
          {votingPlayers.map(({ id, color }) => (
            <Vote key={id} $color={color} />
          ))}
        </Votes>
        <Author $color={color}>— {authorName}</Author>
      </Container>
    );
  }

  return (
    <>
      {fact && (
        <>
          <Label>Fato</Label>
          {renderAnswer(fact)}
        </>
      )}

      <>
        <Label>Conjecturas</Label>
        {conjectures.map(renderAnswer)}

        <Container>
          <StarCheckbox
            $checked={checked(null)}
            $expired={expired}
            $loading={s.loading}
            onClick={handleVote(null)}
          />
          <Description>Nenhuma resposta é satisfatória</Description>
        </Container>
      </>
    </>
  );
};
