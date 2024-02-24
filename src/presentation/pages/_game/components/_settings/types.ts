import { GameModel } from '@domain/models';

export interface SettingsProps {
  onClose?(): void;
}

export type SettingsFieldValues = {
  title: string;
  maxPlayers: number;
  withLightspot: boolean;
  dicesMode: GameModel.DicesMode;
};
