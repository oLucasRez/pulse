import { Color } from '@domain/enums';
import { LandmarkModel } from '@domain/models';

export interface LandmarkProps extends LandmarkModel {
  symbol: string;
  subtitle?: string;
  subtitleItalic?: boolean;
  subtitleColor?: Color;
  onClick?(): void;
}
