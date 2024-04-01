import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralFactUsecases,
  useCentralPulseUsecases,
  useDiceUsecases,
  useGameUsecases,
  usePlayerUsecases,
  useRoundUsecases,
  useSubjectUsecases,
} from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  Dice,
  DiceRoller,
  Dices,
  Map,
  PlayersList,
  Pulses,
  RollDiceEvent,
  Subjects,
} from '../../components';

import { Container } from './styles';

export const CreatingCentralFactState: FC = () => {
  const { currentPlayer, currentDice } = useRoundUsecases();
  const { myPlayer } = usePlayerUsecases();
  const { currentGame, nextGameState } = useGameUsecases();

  const { centralFact, changeCentralFact } = useCentralFactUsecases();

  const [s, set] = useStates({
    description: centralFact?.description,
    changingCentralFact: false,
    dicePosition: currentDice?.position ?? null,
  });

  useEffect(() => {
    s.description = centralFact?.description;
  }, [centralFact?.description]);

  const { changeCentralPulse } = useCentralPulseUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const submitDisabled = s.description === centralFact?.description;

  function handleSubmitButtonClick() {
    if (!s.description) return;

    s.changingCentralFact = true;

    changeCentralFact({ description: s.description })
      .then(nextGameState)
      .catch(alertError)
      .finally(set('changingCentralFact', false));
  }

  const { centralPulse } = useCentralPulseUsecases();

  function handleMapMouseMove(vector: Vector) {
    if (!isMyTurn) return;
    if (currentGame && currentGame.state[1] !== 'update:dice:position') return;
    if (!centralPulse) return;
    if (!currentDice?.value) return;

    s.dicePosition = vector.norm().mult(currentDice.value);
  }

  const { setDicePosition } = useDiceUsecases();
  const { changeMySubject } = useSubjectUsecases();

  function handleMapClick() {
    if (!isMyTurn) return;
    if (currentGame && currentGame.state[1] !== 'update:dice:position') return;
    if (!currentDice) return;
    if (!s.dicePosition) return;

    const { dicePosition } = s;

    s.dicePosition = null;

    Promise.all([
      setDicePosition(currentDice.id, dicePosition),
      changeMySubject({ position: dicePosition }),
    ])
      .then(nextGameState)
      .catch(alertError);
  }

  const { rollDice } = useDiceUsecases();

  function handleDiceRoll({ dice }: RollDiceEvent) {
    rollDice(dice.id)
      .then((dice) => {
        if (dice.value)
          changeCentralPulse({ amount: dice.value })
            .then(nextGameState)
            .catch(alertError);
      })
      .catch(alertError);
  }

  if (!currentGame) return null;

  return (
    <>
      <Map onMouseMove={handleMapMouseMove} onClick={handleMapClick}>
        <Pulses />
        <Subjects />
        <Dices currentHidden transparent />

        {isMyTurn &&
          currentGame.state[1] === 'update:dice:position' &&
          currentDice &&
          s.dicePosition && <Dice {...currentDice} position={s.dicePosition} />}

        {isMyTurn && currentGame.state[1] === 'roll:dice' && (
          <DiceRoller onRollDice={handleDiceRoll} />
        )}
      </Map>

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing the central fact...
        </p>
      )}

      {isMyTurn && currentGame.state[1] === 'change:centralFact' && (
        <Container>
          <article className='modal' onClick={(e) => e.stopPropagation()}>
            <header>
              <h2>Change central fact</h2>
            </header>

            <main>
              <textarea
                autoFocus
                defaultValue={s.description}
                onChange={(e) => (s.description = e.target.value)}
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
