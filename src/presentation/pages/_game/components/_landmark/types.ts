import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

export interface LandmarkProps {
  description: string;
  position: Vector;
  color?: Color;
  symbol: '#' | '?';
  onClick?(): void;
}
