import { FC, useEffect, useRef } from 'react';

import { useGame, usePlayer, useSubject } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { Map, Pulses, SubjectForm, Subjects } from '../../components';

export const CreatingSubjectsState: FC = () => {
  const { currentGame } = useGame();
  const { currentPlayer, myPlayer, isMyTurn } = usePlayer();
  const { createMySubject } = useSubject();

  const [state] = currentGame?.state ?? [];

  const mapRef = useRef<Map.Ref>(null);

  function handleCreateSubject(data: SubjectForm.FormData) {
    createMySubject({
      icon: data.icon,
      description: data.description,
    }).catch(alertError);

    mapRef.current?.closeBakingPaper();
  }

  useEffect(() => {
    if (!isMyTurn || state !== 'creating:subjects') return;

    mapRef.current?.openBakingPaper(
      <SubjectForm
        defaultValues={{ color: myPlayer?.color }}
        hidden={{ color: true }}
        onSubmit={handleCreateSubject}
      />,
    );
  }, [isMyTurn, state]);

  return (
    <>
      <Map ref={mapRef}>
        <Pulses />
        <Subjects />
      </Map>

      {!isMyTurn && (
        <p className='legend handwriting'>
          {currentPlayer?.name} is creating his subject...
        </p>
      )}
    </>
  );
};
