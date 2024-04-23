import { useMemo } from 'react';

import { LandmarkHookReturn } from './types';

import { useCentralFact } from '../_use-central-fact';
import { useQuestion } from '../_use-question';
import { useSubject } from '../_use-subject';

export function useLandmark(): LandmarkHookReturn {
  const { centralFact } = useCentralFact();
  const { questions } = useQuestion();
  const { subjects } = useSubject();

  const landmarks = useMemo(() => {
    if (centralFact) return [centralFact, ...questions, ...subjects];
    return [...questions, ...subjects];
  }, [centralFact, questions, subjects]);

  return { landmarks };
}
