import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { SubjectModel } from '@domain/models';

import { SubjectContextProviderProps, SubjectContextValue } from './types';

import { useGame } from '../_use-game';
import { usePlayer } from '../_use-player';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as SubjectContextValue);

export const useSubject = (): SubjectContextValue => useContext(Context);

export const SubjectContextProvider: FC<SubjectContextProviderProps> = ({
  getSubjects,
  watchSubjects,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'subjects'];

  const { data: subjects = [] } = useQuery({
    queryKey,
    queryFn: () => getSubjects.execute(),
  });

  const { myPlayer } = usePlayer();

  const mySubject = useMemo(() => {
    return subjects.find(({ id }) => id === myPlayer?.subjectID) ?? null;
  }, [subjects, myPlayer]);

  function replaceAll(subjects: SubjectModel[]): void {
    queryClient.setQueryData<SubjectModel[]>(queryKey, () => subjects);
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'dices'] });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'players'] });
  }

  const createSubject = useUsecase(props.createSubject);

  const createMySubject = useUsecase(props.createMySubject);

  const createLightSpotSubject = useUsecase(props.createLightSpotSubject);

  const editSubject = useUsecase(props.editSubject);

  const changeMySubjectPosition = useUsecase(props.changeMySubjectPosition);

  useWatch(async () => {
    if (currentGame)
      return watchSubjects.execute((subjects) => replaceAll(subjects));
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        subjects,
        mySubject,
        createSubject,
        createMySubject,
        createLightSpotSubject,
        editSubject,
        changeMySubjectPosition,
      }}
    >
      {children}
    </Context.Provider>
  );
};
