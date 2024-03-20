import { FC, useEffect } from 'react';

import {
  useCentralFactUsecases,
  useCentralPulseUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError, logError } from '@presentation/utils';

import { DiceRoller, Map, PlayersList } from '../../components';

import { Container } from './styles';

export const CreatingCentralFactState: FC = () => {
  const { currentPlayer, passTurn } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { nextGameState } = useGameUsecases();

  const { centralFact, changeCentralFact } = useCentralFactUsecases();

  const [s, set] = useStates({
    description: centralFact?.description,
    changingCentralFact: false,
    diceValue: null as number | null,
  });

  useEffect(() => {
    s.description = centralFact?.description;
  }, [centralFact?.description]);

  const { changeCentralPulse } = useCentralPulseUsecases();

  useEffect(() => {
    if (!s.diceValue) return;

    changeCentralPulse.execute({ amount: s.diceValue }).catch(alertError);
  }, [!s.diceValue]);

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const submitDisabled = s.description === centralFact?.description;

  function handleSubmitButtonClick(): any {
    if (!s.description) return;

    s.changingCentralFact = true;

    changeCentralFact({ description: s.description })
      // .then(() =>
      //   passTurn().then(
      //     (round) => round.finished && nextGameState().catch(logError),
      //   ),
      // )
      .catch(alertError)
      .finally(set('changingCentralFact', false));
  }

  return (
    <>
      <Map />

      <DiceRoller onDiceRolled={set('diceValue')} />

      <PlayersList />

      {!isMyTurn && (
        <p className='legend handwriting'>
          {currentPlayer?.name} is writing the central fact...
        </p>
      )}

      {isMyTurn && (
        <Container>
          <article className='modal' onClick={(e): any => e.stopPropagation()}>
            <header>
              <h2>Change central fact</h2>
            </header>

            <main>
              <textarea
                autoFocus
                defaultValue={s.description}
                onChange={(e): any => (s.description = e.target.value)}
              />
            </main>

            <footer>
              <button
                disabled={submitDisabled}
                onClick={handleSubmitButtonClick}
              >
                {s.changingCentralFact && (
                  <>
                    <span className='loading'>⏳</span>{' '}
                  </>
                )}
                Edit
              </button>
            </footer>
          </article>
        </Container>
      )}
    </>
  );
};
