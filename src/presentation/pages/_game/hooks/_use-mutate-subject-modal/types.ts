import { ReactElement } from 'react';

import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export type MutateSubjectModalHookReturn = {
  openMutateSubjectModal(subject?: SubjectModel): void;
  renderMutateSubjectModal(): ReactElement;
};

export type MutateSubjectModalHookProps =
  | {
      unclosable?: boolean;
      open?: boolean;
      subject?: SubjectModel;
      position?: Vector;
      onSuccess?(subject: SubjectModel): void;
    }
  | undefined;
