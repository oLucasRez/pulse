import { FC, useEffect } from 'react';

import { usePlayer } from '@presentation/hooks';

import { useMutateSubjectModal } from '../../hooks';

import { Map, PlayersList, Pulses } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { myPlayer, currentPlayer } = usePlayer();

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
