import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { SubjectPulseModel } from '@domain/models';

import {
  SubjectPulseContextProviderProps,
  SubjectPulseContextValue,
} from './types';

import { useGame } from '../_use-game';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as SubjectPulseContextValue);

export const useSubjectPulse = (): SubjectPulseContextValue =>
  useContext(Context);

export const SubjectPulseContextProvider: FC<
  SubjectPulseContextProviderProps
> = ({ getSubjectPulses, watchSubjectPulses, children, ...props }) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'subjectPulses'];

  const { data: subjectPulses = [] } = useQuery({
    queryKey,
    queryFn: () => getSubjectPulses.execute(),
  });

  const createSubjectPulse = useUsecase(props.createSubjectPulse);

  useWatch(async () => {
    if (currentGame)
      return watchSubjectPulses.execute((subjectPulses) =>
        queryClient.setQueryData<SubjectPulseModel[]>(
          queryKey,
          () => subjectPulses,
        ),
      );
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        subjectPulses,
        createSubjectPulse,
      }}
    >
      {children}
    </Context.Provider>
  );
};
