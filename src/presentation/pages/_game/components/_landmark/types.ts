import { LandmarkModel } from '@domain/models';

export interface LandmarkProps extends LandmarkModel {
  symbol: '#' | '?';
  onClick?(): void;
}
