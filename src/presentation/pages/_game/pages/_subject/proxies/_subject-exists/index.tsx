import { cloneElement, FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Navigate } from '@presentation/components';
import { useSubject } from '@presentation/hooks';

import {
  SubjectExistsProxyChildrenProps,
  SubjectExistsProxyProps,
} from './types';

export const SubjectExistsProxy: FC<SubjectExistsProxyProps> = ({
  children,
}) => {
  const params = useParams();

  const { subjects } = useSubject();

  const subject = useMemo(
    () => subjects.find(({ id }) => id === params.subjectID) ?? null,
    [subjects, params.subjectID],
  );

  if (params.subjectID && !subject) return <Navigate.toGame replace />;

  return cloneElement(children, { subject });
};

export namespace SubjectExistsProxy {
  export type ChildrenProps = SubjectExistsProxyChildrenProps;
}
