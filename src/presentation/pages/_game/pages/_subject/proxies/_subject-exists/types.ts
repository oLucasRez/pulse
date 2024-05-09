import { ReactElement } from 'react';

import { SubjectModel } from '@domain/models';

export interface SubjectExistsProxyProps {
  children: ReactElement<SubjectExistsProxyChildrenProps>;
}

export interface SubjectExistsProxyChildrenProps {
  subject?: SubjectModel | null;
}
