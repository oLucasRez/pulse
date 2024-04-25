import { FC, ReactNode } from 'react';

import { GameModel } from '@domain/models';

import { Navigate } from '@presentation/components';
import { useGame, useNavigate, usePlayer, useUser } from '@presentation/hooks';

import {
  CreatingAnswersState,
  CreatingCentralFactState,
  CreatingLightSpotState,
  CreatingQuestionsState,
  CreatingSubjectsState,
  FinalState,
  InitialState,
} from './states';

import { Container, Main } from './styles';

const GamePage: FC = () => {
  const { currentGame } = useGame();

  const { myPlayer } = usePlayer();

  const { navigateToHome, navigateToLogout } = useNavigate();

  const { me } = useUser();

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
      'creating:lightSpot': <CreatingLightSpotState />,
      'final:state': <FinalState />,
    };

    return <Main>{map[currentGame.state[0]]}</Main>;
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

  if (!currentGame) return <Navigate.toHome />;

  return (
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
  );
};

export default GamePage;
