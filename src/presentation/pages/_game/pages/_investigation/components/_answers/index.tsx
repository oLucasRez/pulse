import { FC, useEffect, useMemo } from 'react';

import { AnswerModel, PlayerModel } from '@domain/models';

import { Button, Icon, IconButton } from '@presentation/components';
import {
  useAnswer,
  usePlayer,
  useQuestion,
  useStates,
  useToast,
} from '@presentation/hooks';

import {
  AnswerContainer,
  Author,
  Buttons,
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
  const { answers: allAnswers, editAnswer } = useAnswer();
  const { myPlayer, players } = usePlayer();
  const { voteQuestionFact } = useQuestion();

  const [s, set] = useStates({
    editMode: undefined as string | undefined,
    editingDescription: undefined as string | undefined,
    editLoading: false,
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
    [allAnswers, question.id, s.editMode],
  );

  const fact = useMemo(
    () => allAnswers.find(({ id }) => id === question.factID) ?? null,
    [allAnswers, question.factID],
  );

  const toast = useToast();

  function handleVote(value: string | null) {
    return () => {
      s.loading = true;
      voteQuestionFact(question.id, value)
        .catch(toast.error)
        .finally(set('loading', false));
    };
  }

  useEffect(() => {
    s.editingDescription = undefined;
  }, [s.editMode]);

  if (!conjectures.length && !fact) return null;

  function renderAnswer({
    id,
    description,
    color,
    authorName,
    authorID,
  }: AnswerModel) {
    const isFact = fact?.id === id;
    const inputDisabled = s.editLoading || s.editMode !== id;
    const showEditButton = !s.editMode && authorID === myPlayer?.id;
    const showButtons = s.editMode === id;
    const editDisabled =
      s.editLoading ||
      !s.editingDescription ||
      s.editingDescription === description;

    const votingPlayers: PlayerModel[] = [];
    Object.entries(question.votes).map(([playerID, { answerID }]) => {
      if (answerID !== id) return;

      const player = players.find(({ id }) => id === playerID);

      if (player) votingPlayers.push(player);
    });

    function handleSubmit() {
      s.editLoading = true;
      editAnswer(id, { description: s.editingDescription })
        .catch(toast.error)
        .finally(set('editMode', undefined))
        .finally(set('editLoading', false));
    }

    const descriptionValue =
      s.editMode === id ? s.editingDescription || description : description;

    return (
      <AnswerContainer key={id}>
        <StarCheckbox
          $checked={checked(id)}
          $expired={expired}
          $loading={s.loading}
          $color={color}
          onClick={handleVote(id)}
        />
        <DescriptionInput
          disabled={inputDisabled}
          defaultValue={description}
          value={descriptionValue}
          color={color}
          $fact={isFact}
          onChange={set('editingDescription')}
        />
        <Votes>
          {votingPlayers.map(({ id, color }) => (
            <Vote key={id} $color={color} />
          ))}
        </Votes>
        <Author $color={color}>— {authorName}</Author>

        {showEditButton && (
          <IconButton
            className='edit'
            icon={<Icon.Pencil />}
            size='small'
            onClick={set('editMode', id)}
          />
        )}

        {showButtons && (
          <Buttons>
            <Button
              disabled={s.editLoading}
              onClick={() => {
                s.editMode = undefined;
                s.editingDescription = undefined;
              }}
            >
              Cancelar
            </Button>

            <Button
              color={color}
              disabled={editDisabled}
              loading={s.editLoading}
              onClick={handleSubmit}
            >
              Editar
            </Button>
          </Buttons>
        )}
      </AnswerContainer>
    );
  }

  return (
    <Container>
      {fact && (
        <>
          <Label>Fato</Label>
          {renderAnswer(fact)}
        </>
      )}

      <>
        <Label>Conjecturas</Label>
        {conjectures.map(renderAnswer)}

        <AnswerContainer>
          <StarCheckbox
            $checked={checked(null)}
            $expired={expired}
            $loading={s.loading}
            onClick={handleVote(null)}
          />
          <Description>Nenhuma resposta é satisfatória</Description>
        </AnswerContainer>
      </>
    </Container>
  );
};
