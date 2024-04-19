import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { DomainError } from '@domain/errors';

import { IUsecase, Props } from './types';

export function useUsecase<A extends unknown[], R>(
  usecase: IUsecase<A, R>,
  { onSuccess }: Props<A, R> = {},
): IUsecase<A, R>['execute'] {
  const mutation = useMutation<R, DomainError, A>({
    mutationFn: (args) => usecase.execute(...args),
    onSuccess,
  });

  return useCallback<IUsecase<A, R>['execute']>(
    (...args) => mutation.mutateAsync(args),
    [mutation],
  );
}
