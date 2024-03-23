import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralFactUsecases,
  useCentralPulseUsecases,
  useDiceUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import { Dice, DiceRoller, Map, PlayersList } from '../../components';

import { Container } from './styles';

export const CreatingCentralFactState: FC = () => {
  const { currentPlayer, currentDice } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { currentGame, nextGameState } = useGameUsecases();

  const { centralFact, changeCentralFact } = useCentralFactUsecases();

  const [s, set] = useStates({
    description: centralFact?.description,
    changingCentralFact: false,
    diceValue: null as number | null,
    dicePosition: currentDice?.position ?? null,
  });

  useEffect(() => {
    s.description = centralFact?.description;
  }, [centralFact?.description]);

  const { changeCentralPulse } = useCentralPulseUsecases();

  useEffect(() => {
    if (!s.diceValue) return;

    changeCentralPulse({ amount: s.diceValue })
      .then(nextGameState)
      .catch(alertError);
  }, [!s.diceValue]);

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const submitDisabled = s.description === centralFact?.description;

  function handleSubmitButtonClick(): any {
    if (!s.description) return;

    s.changingCentralFact = true;

    changeCentralFact({ description: s.description })
      .then(nextGameState)
      .catch(alertError)
      .finally(set('changingCentralFact', false));
  }

  const { centralPulse } = useCentralPulseUsecases();

  function handleMapMouseMove(vector: Vector): any {
    if (!isMyTurn) return;
    if (currentGame && currentGame.state[1] !== 'update:dice:position') return;
    if (!centralPulse) return;

    s.dicePosition = vector.norm().mult(centralPulse.amount);
  }

  const { dices, setDicePosition } = useDiceUsecases();

  function handleMapClick(): any {
    if (!isMyTurn) return;
    if (currentGame && currentGame.state[1] !== 'update:dice:position') return;
    if (!currentDice) return;
    if (!s.dicePosition) return;

    const { dicePosition } = s;

    s.dicePosition = null;

    setDicePosition(currentDice.id, dicePosition)
      .then(nextGameState)
      .catch(alertError);
  }

  if (!currentGame) return null;

  return (
    <>
      <Map onMouseMove={handleMapMouseMove} onClick={handleMapClick}>
        {dices.map(
          (dice) =>
            dice.id !== currentDice?.id && <Dice key={dice.id} {...dice} />,
        )}

        {isMyTurn &&
          currentGame.state[1] === 'update:dice:position' &&
          currentDice &&
          s.dicePosition && <Dice {...currentDice} position={s.dicePosition} />}
      </Map>

      {isMyTurn && currentGame.state[1] === 'roll:dice' && (
        <DiceRoller onDiceRolled={set('diceValue')} />
      )}

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing the central fact...
        </p>
      )}

      {isMyTurn && currentGame.state[1] === 'change:centralFact' && (
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
