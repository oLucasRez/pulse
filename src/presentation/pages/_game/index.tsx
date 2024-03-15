import { FC, ReactNode } from 'react';

import { GameModel } from '@domain/models';

import { GlobalLoading, Navigate } from '@presentation/components';
import {
  useAuthUsecases,
  useCentralFactUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { useNavigate, useStates, useWatch } from '@presentation/hooks';

import {
  CreatingCentralFactState,
  CreatingSubjectsState,
  InitialState,
} from './states';

import { Container, Main } from './styles';

const GamePage: FC = () => {
  const [s, set] = useStates({
    watching: true,
  });

  const { currentGame, watchCurrentGame } = useGameUsecases();

  const { myPlayer, watchPlayers } = usePlayerUsecases();

  const { watchRounds } = useRoundUsecases();
  const { watchSubjects } = useSubjectUsecases();
  const { watchCentralFact } = useCentralFactUsecases();

  useWatch(async () => {
    const unsubscribes = await Promise.all([
      watchPlayers(),
      watchCurrentGame(),
      watchRounds(),
      watchSubjects(),
      watchCentralFact(),
    ]).finally(set('watching', false));

    return () => unsubscribes.map((unsubscribe) => unsubscribe());
  });

  const { navigateToHome, navigateToLogout } = useNavigate();

  const { me } = useAuthUsecases();

  if (!me) return null;

  function renderMain(): ReactNode {
    if (myPlayer?.banned)
      return (
        <Main>
          <span className='icon block'>🚫</span>
          you were banned by the host
          <button onClick={navigateToHome}>Go back</button>
        </Main>
      );

    if (!currentGame) return null;

    const map: Record<GameModel.State, ReactNode> = {
      'initial:state': <InitialState />,
      'creating:subjects': <CreatingSubjectsState />,
      'creating:centralFact': <CreatingCentralFactState />,
      'creating:questions': null,
      'creating:answers': null,
      'creating:lightSpot': null,
      'final:state': null,
    };

    return (
      <Main>
        <div style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          {currentGame.state}
        </div>
        {map[currentGame.state]}
      </Main>
    );
  }

  function renderMyHeader(): ReactNode {
    return (
      <span className='greetings'>
        {myPlayer?.avatar} Hello
        {me?.name ? (
          <>
            , <b>{me.name}</b>
          </>
        ) : (
          ''
        )}
        !
      </span>
    );
  }

  if (s.watching) return <GlobalLoading />;

  if (!currentGame) return <Navigate.toHome />;

  return (
    <>
      <Container>
        <header>
          <button onClick={navigateToHome}>🔙</button>

          <h2>
            <b>{currentGame.title}</b>
          </h2>

          {renderMyHeader()}
          <button onClick={navigateToLogout}>🚪</button>
        </header>

        {renderMain()}
      </Container>
    </>
  );
};

export default GamePage;
