import { SubjectModel } from '@domain/models';

import { ISubjectDAO } from '@data/dao';

export async function getOldestSubject(
  order: number,
  { subjectDAO }: Deps,
): Promise<SubjectModel.DTO | null> {
  const subjects = await subjectDAO.getByOrder(order);
  subjects.sort(
    (subject1, subject2) => subject1.createdAt - subject2.createdAt,
  );

  return subjects[0] ?? null;
}

type Deps = {
  subjectDAO: ISubjectDAO;
};
