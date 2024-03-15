import { FC, useEffect } from 'react';

import {
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { logError } from '@presentation/utils';

import { useMutateSubjectModal } from '../../hooks';

import { Map, PlayersList } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentPlayer, passTurn } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { nextGameState } = useGameUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  function handleSuccessCreateSubject(): any {
    passTurn()
      .then((round) => round.finished && nextGameState().catch(logError))
      .catch(logError);
  }

  const { renderMutateSubjectModal, openMutateSubjectModal } =
    useMutateSubjectModal({ onSuccess: handleSuccessCreateSubject });

  useEffect(() => {
    if (isMyTurn) openMutateSubjectModal();
  }, [isMyTurn]);

  return (
    <>
      <Map />

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
