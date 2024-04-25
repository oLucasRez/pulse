import { FC, useEffect } from 'react';

import { usePlayer } from '@presentation/hooks';

import { useMutateSubjectModal } from '../../hooks';

import { Map, Pulses, Subjects } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentPlayer, isMyTurn } = usePlayer();

  const { renderMutateSubjectModal, openMutateSubjectModal } =
    useMutateSubjectModal();

  useEffect(() => {
    if (isMyTurn) openMutateSubjectModal();
  }, [isMyTurn]);

  return (
    <>
      <Map>
        <Pulses />
        <Subjects />
      </Map>

      {!isMyTurn && (
        <p className='legend handwriting'>
          {currentPlayer?.name} is creating his subject...
        </p>
      )}

      {renderMutateSubjectModal()}
    </>
  );
};
