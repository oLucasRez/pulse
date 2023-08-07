import {
  CentralFact,
  CentralPulse,
  Dice,
  Game,
  Player,
  Question,
  Subject,
  SubjectPulse,
  User,
} from '@domain/models';

import { Color } from '@domain/enums';

import { Vector } from '@utils';

import { crossing, vector } from './types';

const userRepository: User[] = [];
const gameRepository: Game[] = [];
const playerRepository: Player[] = [];
const subjectRepository: Subject[] = [];
// ----------------------------------------------------------------------------
export function createUser(props: User.NewProps): User.DTO {
  const user = new User(props);

  userRepository.push(user);

  return user.toDTO();
}
// ----------------------------------------------------------------------------
export function createGame(userID: string): Game.DTO {
  const user = userRepository.find(({ id }) => id === userID);
  if (!user) throw `User not found for ID ${userID}`;

  const game = user.createGame({});

  gameRepository.push(game);

  return game.toDTO();
}
// ----------------------------------------------------------------------------
export function getGame(gameID: string): Game.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  return game.toDTO();
}
// ----------------------------------------------------------------------------
type CreatePlayerPayload = {
  name: string;
  color: Color;
  userID?: string;
};
export function createPlayer(
  gameID: string,
  payload: CreatePlayerPayload,
): Player.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const user = userRepository.find(({ id }) => id === payload.userID);

  const player = game.createPlayer({
    name: payload.name,
    color: payload.color,
    user,
  });

  playerRepository.push(player);

  return player.toDTO();
}
// ----------------------------------------------------------------------------
export function startGame(gameID: string): void {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  game.start();
}
// ----------------------------------------------------------------------------
export function getCurrentPlayer(gameID: string): Player.DTO | null {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const player = game.getCurrentPlayer();

  return player?.toDTO() || null;
}
// ----------------------------------------------------------------------------
type CreateSubjectPayload = {
  description: string;
};
export function createSubject(
  gameID: string,
  payload: CreateSubjectPayload,
): Subject.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const subject = game.createSubject({
    description: payload.description,
  });

  subjectRepository.push(subject);

  return subject.toDTO();
}
// ----------------------------------------------------------------------------
export function finishTurn(gameID: string): void {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  game.finishTurn();
}
// ----------------------------------------------------------------------------
export function getCentralFact(gameID: string): CentralFact.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const centralFact = game.getCentralFact();

  return centralFact.toDTO();
}
// ----------------------------------------------------------------------------
export function updateCentralFactDescription(
  gameID: string,
  description: string,
): CentralFact.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const centralFact = game.updateCentralFactDescription(description);

  return centralFact.toDTO();
}
// ----------------------------------------------------------------------------
export function getCurrentDice(gameID: string): Dice.DTO | null {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const currentPlayer = game.getCurrentPlayer();

  if (!currentPlayer) return null;

  const dice = currentPlayer.getDice();

  return dice.toDTO();
}
// ----------------------------------------------------------------------------
export function rollCurrentDice(gameID: string): Dice.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const dice = game.rollCurrentDice();

  return dice.toDTO();
}
// ----------------------------------------------------------------------------
export function updateCentralPulseAmount(gameID: string): CentralPulse.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const centralPulse = game.updateCentralPulseAmount();

  return centralPulse.toDTO();
}
// ----------------------------------------------------------------------------
export function updateCurrentDicePosition(
  gameID: string,
  position: vector.DTO,
): Dice.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  // @todo: extirpar vector.DTO
  const dice = game.updateCurrentDicePosition(Vector(position.x, position.y));

  return dice.toDTO();
}
// ----------------------------------------------------------------------------
export function updateCurrentSubjectPosition(gameID: string): Subject.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const subject = game.updateCurrentSubjectPosition();

  return subject.toDTO();
}
// ----------------------------------------------------------------------------
export function createSubjectPulse(
  gameID: string,
  gap: number,
): SubjectPulse.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const subjectPulse = game.createSubjectPulse(gap);

  return subjectPulse.toDTO();
}
// ----------------------------------------------------------------------------
export function getCrossings(gameID: string): crossing.DTO[] {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const crossings = game.getCrossings();

  return crossings.map((crossing) => crossing.toDTO());
}
// ----------------------------------------------------------------------------
type CreateQuestionPayload = {
  description: string;
  scope: Subject.DTO[];
};
export function createQuestion(
  gameID: string,
  payload: CreateQuestionPayload,
): Question.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const { description } = payload;

  const scope: Subject[] = [];
  subjectRepository.map(
    (subject) =>
      payload.scope.map(({ id }) => id).includes(subject.id) &&
      scope.push(subject),
  );

  const question = game.createQuestion({ description, scope });

  return question.toDTO();
}
