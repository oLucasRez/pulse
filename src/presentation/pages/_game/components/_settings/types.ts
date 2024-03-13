import { GameModel } from '@domain/models';

export interface SettingsProps {
  onClose?(): void;
}

export type SettingsFieldValues = {
  title: string;
  maxPlayers: number;
  withLightSpot: boolean;
  dicesMode: GameModel.DicesMode;
};
