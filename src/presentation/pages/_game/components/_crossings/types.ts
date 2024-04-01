import { Circle, Vector } from '@domain/utils';

export interface CrossingsProps {
  targetCircle: Circle;
  onSelectCrossing?(crossing: Vector | null): void;
}
