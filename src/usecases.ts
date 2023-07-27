import {
  CentralFact,
  CentralPulse,
  Dice,
  Game,
  Player,
  Subject,
  User,
} from '@domain/models';

import { Color } from '@domain/enums';

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
export function updateDiceValue(gameID: string, value: number): void {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  game.updateDiceValue(value);
}
// ----------------------------------------------------------------------------
export function updateCentralPulseAmount(gameID: string): CentralPulse.DTO {
  const game = gameRepository.find(({ id }) => id === gameID);
  if (!game) throw `Game not found for ID ${gameID}`;

  const centralPulse = game.updateCentralPulseAmount();

  return centralPulse.toDTO();
}
