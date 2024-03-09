import { GameModel } from '@domain/models';

export interface GameState {
  games: GameModel[];
  currentGame: GameModel | null;
}
