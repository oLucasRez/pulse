import { FC, useEffect } from 'react';

import { usePlayerUsecases, useRoundUsecases } from '@presentation/contexts';

import { useMutateSubjectModal } from '../../hooks';

import { Map, PlayersList, Pulses } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentPlayer } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const { renderMutateSubjectModal, openMutateSubjectModal } =
    useMutateSubjectModal();

  useEffect(() => {
    if (isMyTurn) openMutateSubjectModal();
  }, [isMyTurn]);

  return (
    <>
      <Map>
        <Pulses />
      </Map>

      <PlayersList />

      {!isMyTurn && (
        <p className='legend handwriting'>
          {currentPlayer?.name} is creating his subject...
        </p>
      )}

      {renderMutateSubjectModal()}
    </>
  );
};
