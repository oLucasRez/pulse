import { Color } from '@domain/enums';

export interface SubjectFormProps {
  onSubmit?(data: FormData): void;
}

export type FormData = {
  icon: string;
  color: Color;
  description: string;
};
