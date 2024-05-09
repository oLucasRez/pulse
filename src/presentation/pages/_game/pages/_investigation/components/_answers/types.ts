import { Color } from '@domain/enums';
import { QuestionModel } from '@domain/models';

import { Input } from '@presentation/components';

export interface AnswersProps {
  question: QuestionModel;
}

export interface $StarCheckboxProps {
  $checked: boolean;
  $expired: boolean;
  $loading: boolean;
  $color?: Color;
}

export interface $DescriptionInputProps extends Input.Props {
  $color: Color;
  $fact?: boolean;
}

export interface $VoteProps {
  $color: Color;
}

export interface $AuthorProps {
  $color: Color;
}
