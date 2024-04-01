import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

export type CreatePulseEvent = {
  amount: number;
  gap: number;
  origin: Vector;
};

export interface PulseCreatorProps {
  origin: Vector;
  amount: number;
  color: Color;
  onCreatePulse?(event: CreatePulseEvent): void;
}
