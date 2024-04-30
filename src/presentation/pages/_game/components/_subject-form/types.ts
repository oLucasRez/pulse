import { Color } from '@domain/enums';

export interface SubjectFormProps {
  defaultValues?: Partial<FormData>;
  hidden?: Partial<Record<keyof FormData, boolean>>;
  onSubmit?(data: FormData): void;
}

export type FormData = {
  icon: string;
  color: Color;
  description: string;
};
