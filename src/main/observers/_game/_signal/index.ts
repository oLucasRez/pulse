import { GameModel } from '@domain/models';

import { GameObserver } from '@data/observers';

import { gameSignals } from '@presentation/signals';

import { removeItem } from '@presentation/utils';

const { games } = gameSignals;

export class SignalGameSubscriber implements GameObserver.Subscriber {
  public onFetchGames(games: GameModel[]): void {
    gameSignals.games.value = games;
  }

  public onFetchGame(game: GameModel): void {
    const newGames = [...games.value];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    games.value = newGames;
  }

  public onFetchCurrentGame(game: GameModel | null): void {
    if (!game) return;

    const newGames = [...games.value];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    games.value = newGames;
  }

  public onCreateGame(game: GameModel): void {
    const newGames = [...games.value];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    games.value = newGames;
  }

  public onChangeGame(game: GameModel): void {
    const newGames = [...games.value];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    games.value = newGames;
  }

  public onDeleteGame(id: string): void {
    const newGames = [...games.value];

    removeItem(newGames, (value) => value.id === id);

    games.value = newGames;
  }

  public onStartGame(game: GameModel): void {
    const newGames = [...games.value];

    const i = removeItem(newGames, (value) => value.id === game.id);
    if (i === -1) newGames.push(game);
    else newGames.splice(i, 0, game);

    games.value = newGames;
  }
}
