import { Color } from '@domain/enums';
import { SubjectModel } from '@domain/models';

export interface QuestionFormProps {
  color: Color;
  subjects: SubjectModel[];
  onSubmit?(data: FormData): void;
}

export type FormData = {
  description: string;
};
