import { FC } from 'react';

import { useNavigate, useSubject } from '@presentation/hooks';

import { SubjectProps } from './types';

import { Landmark } from '..';

export const Subject: FC<SubjectProps> = ({ icon, ...props }) => {
  const { navigateToSubject } = useNavigate();

  return (
    <Landmark
      symbol={icon}
      {...props}
      onClick={() => navigateToSubject(props.id)}
    />
  );
};

export const Subjects: FC = () => {
  const { subjects } = useSubject();

  return (
    <>
      {subjects.map((subject) => (
        <Subject key={subject.id} {...subject} />
      ))}
    </>
  );
};
