export interface CentralFactFormProps {
  defaultValues?: Partial<FormData>;
  onSubmit?(data: FormData): void;
}

export type FormData = {
  description: string;
};
