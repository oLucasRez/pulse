import { FC, ReactNode, useEffect } from 'react';

import { GameModel } from '@domain/models';

import { Navigate } from '@presentation/components';
import {
  useGame,
  useNavigate,
  usePlayer,
  useToast,
  useUser,
} from '@presentation/hooks';

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

  const { navigateToHome } = useNavigate();

  const { me } = useUser();

  const toast = useToast();

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

  useEffect(() => () => toast.dismissAll(), []);

  if (!currentGame) return <Navigate.toHome />;

  return <Container>{renderMain()}</Container>;
};

export default GamePage;
