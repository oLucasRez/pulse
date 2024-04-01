import { FC, useEffect } from 'react';

import {
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { logError } from '@presentation/utils';

import { useMutateSubjectModal } from '../../hooks';

import { Map, PlayersList, Pulses } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentPlayer } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { nextGameState } = useGameUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  function handleSuccessCreateSubject() {
    nextGameState().catch(logError);
  }

  const { renderMutateSubjectModal, openMutateSubjectModal } =
    useMutateSubjectModal({ onSuccess: handleSuccessCreateSubject });

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
