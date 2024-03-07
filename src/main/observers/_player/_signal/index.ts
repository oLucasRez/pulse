import { PlayerModel } from '@domain/models';

import { PlayerObserver } from '@data/observers';

import { playerSignals } from '@presentation/signals';

import { removeItem } from '@presentation/utils';

const { players } = playerSignals;

export class SignalPlayerSubscriber implements PlayerObserver.Subscriber {
  public onFetchPlayers(players: PlayerModel[]): void {
    playerSignals.players.value = players;
  }

  public onFetchPlayer(player: PlayerModel): void {
    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }

  public onFetchMyPlayer(player: PlayerModel): void {
    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }

  public onFetchCurrentPlayer(player: PlayerModel | null): void {
    if (!player) return;

    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }

  public onCreatePlayer(player: PlayerModel): void {
    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }

  public onChangePlayer(player: PlayerModel): void {
    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }

  public onDeletePlayer(id: string): void {
    const newPlayers = [...players.value];

    removeItem(newPlayers, (value) => value.id === id);

    players.value = newPlayers;
  }

  public onBanPlayer(player: PlayerModel): void {
    const newPlayers = [...players.value];

    const i = removeItem(newPlayers, (value) => value.id === player.id);
    if (i === -1) newPlayers.push(player);
    else newPlayers.splice(i, 0, player);

    players.value = newPlayers;
  }
}
