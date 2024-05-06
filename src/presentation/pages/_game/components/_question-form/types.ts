import { Color } from '@domain/enums';

export interface QuestionFormProps {
  color: Color;
  onSubmit?(data: FormData): void;
}

export type FormData = {
  description: string;
};
