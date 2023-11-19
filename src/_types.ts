import { Game, Model, Player, User } from '@domain/models';

interface ModelDTO {
  id: GetID<Model>;
}
function toModelDTO(model: Model): ModelDTO {
  return {
    id: model.id,
  };
}
// ----------------------------------------------------------------------------
export interface UserDTO extends ModelDTO {
  name: User['name'];
}
export function toUserDTO(user: User): UserDTO {
  return {
    ...toModelDTO(user),
    name: user.getName(),
  };
}
// ----------------------------------------------------------------------------
export interface GameDTO extends ModelDTO {
  hostID: GetID<Game['host']>;
  roundID: GetID<Game['round']>;
  dicePickerID: GetID<Game['dicePicker']>;
  stateID: GetID<Game['state']>;
  centralPulseID: GetID<Game['centralPulse']>;
  subjectPulseIDs: GetID<Game['subjectPulses']>;
  questionIDs: GetID<Game['questions']>;
}
export function toGameDTO(game: Game): GameDTO {
  return {
    ...toModelDTO(game),
    hostID: game.getHost().id,
    roundID: game.getRound().id,
    dicePickerID: game.getDicePicker().id,
    stateID: game.getState().id,
    centralPulseID: game.getCentralPulse().id,
    subjectPulseIDs: game.getSubjectPulses().map(({ id }) => id),
    questionIDs: game.getQuestions().map(({ id }) => id),
  };
}
// ----------------------------------------------------------------------------
export interface PlayerDTO extends ModelDTO {
  name: Player['name'];
  color: Player['color'];
  userID: GetID<Player['user']>;
  gameID: GetID<Player['game']>;
  diceID: GetID<Player['dice']>;
  subjectID: GetID<Player['subject']>;
}
export function toPlayerDTO(player: Player): PlayerDTO {
  return {
    ...toModelDTO(player),
    name: player.getName(),
    color: player.getColor(),
    userID: player.getUser()?.id ?? null,
    gameID: player.getGame().id,
    diceID: player.getDice().id,
    subjectID: player.getSubject()?.id ?? null,
  };
}
