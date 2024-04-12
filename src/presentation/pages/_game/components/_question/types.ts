import { AnswerModel, PlayerModel, QuestionModel } from '@domain/models';

export type AnswerEvent = { question: QuestionModel; description: string };
export type VoteEvent = {
  player: PlayerModel;
  answer: AnswerModel;
  value: boolean;
};

export interface QuestionsProps {
  onAnswer?(event: AnswerEvent): void;
  onVote?(event: VoteEvent): void;
}

export type QuestionProps = QuestionModel & {
  onAnswer?(event: AnswerEvent): void;
  onVote?(event: VoteEvent): void;
};
