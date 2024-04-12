import { FC, ReactNode } from 'react';

import { GameModel } from '@domain/models';

import { GlobalLoading, Navigate } from '@presentation/components';
import {
  useAnswerUsecases,
  useAuthUsecases,
  useCentralFactUsecases,
  useCentralPulseUsecases,
  useDiceUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useQuestionUsecases,
  useRoundUsecases,
  useSubjectPulseUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { useNavigate, useStates, useWatch } from '@presentation/hooks';

import {
  CreatingAnswersState,
  CreatingCentralFactState,
  CreatingQuestionsState,
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
  const { watchDices } = useDiceUsecases();
  const { watchCentralPulse } = useCentralPulseUsecases();
  const { watchSubjectPulses } = useSubjectPulseUsecases();
  const { watchQuestions } = useQuestionUsecases();
  const { watchAnswers } = useAnswerUsecases();

  useWatch(async () => {
    const unsubscribes = await Promise.all([
      watchPlayers(),
      watchCurrentGame(),
      watchRounds(),
      watchSubjects(),
      watchCentralFact(),
      watchDices(),
      watchCentralPulse(),
      watchSubjectPulses(),
      watchQuestions(),
      watchAnswers(),
    ]).finally(set('watching', false));

    return () => unsubscribes.map((unsubscribe) => unsubscribe());
  });

  const { navigateToHome, navigateToLogout } = useNavigate();

  const { me } = useAuthUsecases();

  if (!me) return null;

  function renderMain() {
    if (myPlayer?.banned)
      return (
        <Main>
          <span className='icon block'>🚫</span>
          you were banned by the host
          <button onClick={navigateToHome}>Go back</button>
        </Main>
      );

    if (!currentGame) return null;

    const map: Record<GameModel.State[0], ReactNode> = {
      'initial:state': <InitialState />,
      'creating:subjects': <CreatingSubjectsState />,
      'creating:centralFact': <CreatingCentralFactState />,
      'creating:questions': <CreatingQuestionsState />,
      'creating:answers': <CreatingAnswersState />,
      'creating:lightSpot': null,
      'final:state': null,
    };

    return (
      <Main>
        <div
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {currentGame.state.map((state, i) => (
            <div key={i}>{state}</div>
          ))}
        </div>

        {map[currentGame.state[0]]}
      </Main>
    );
  }

  function renderMyHeader() {
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
