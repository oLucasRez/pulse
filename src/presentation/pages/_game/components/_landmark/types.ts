import { LandmarkModel } from '@domain/models';

export interface LandmarkProps extends LandmarkModel {
  symbol: string;
  solved?: boolean;
  onClick?(): void;
}
