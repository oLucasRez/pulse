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
  CentralFact,
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
  const { currentGame } = useGameUsecases();
  const { mySubject, changeMySubjectPosition } = useSubjectUsecases();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const { centralFact, changeCentralFact } = useCentralFactUsecases();

  const [s, set] = useStates({
    description: centralFact?.description,
    changingCentralFact: false,
    dicePosition: mySubject?.position ?? null,
  });

  useEffect(() => {
    s.description = centralFact?.description;
  }, [centralFact?.description]);

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  const submitDisabled = s.description === centralFact?.description;

  function handleSubmitButtonClick() {
    if (!s.description) return;

    s.changingCentralFact = true;

    changeCentralFact({ description: s.description })
      .catch(alertError)
      .finally(set('changingCentralFact', false));
  }

  const { centralPulse } = useCentralPulseUsecases();

  function handleMapMouseMove(vector: Vector) {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!centralPulse) return;
    if (!currentDice?.value) return;

    s.dicePosition = vector.norm().mult(currentDice.value);
  }

  function handleMapClick() {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!currentDice) return;
    if (!s.dicePosition) return;

    const { dicePosition } = s;

    s.dicePosition = null;

    changeMySubjectPosition(dicePosition).catch(alertError);
  }

  const { rollDice } = useDiceUsecases();

  function handleDiceRoll({ dice }: RollDiceEvent) {
    rollDice(dice.id).catch(alertError);
  }

  if (!currentGame) return null;

  return (
    <>
      <Map onMouseMove={handleMapMouseMove} onClick={handleMapClick}>
        <Pulses />
        <Subjects />
        <Dices currentHidden transparent />
        <CentralFact />

        {isMyTurn &&
          state === 'update:dice:position' &&
          currentDice &&
          s.dicePosition && <Dice {...currentDice} position={s.dicePosition} />}

        {isMyTurn && state === 'roll:dice' && (
          <DiceRoller onRollDice={handleDiceRoll} />
        )}
      </Map>

      <PlayersList />

      {!isMyTurn && currentPlayer && (
        <p className='legend handwriting'>
          {currentPlayer.name} is writing the central fact...
        </p>
      )}

      {isMyTurn && state === 'change:centralFact' && (
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
