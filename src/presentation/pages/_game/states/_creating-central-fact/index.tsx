import { FC, useEffect } from 'react';

import { Vector } from '@domain/utils';

import {
  useCentralFact,
  useCentralPulse,
  useDice,
  useGame,
  usePlayer,
  useStates,
  useSubject,
} from '@presentation/hooks';
import { alertError } from '@presentation/utils';

import {
  CentralFact,
  Dice,
  DiceRoller,
  Dices,
  Map,
  Pulses,
  Subjects,
} from '../../components';

import { Container } from './styles';

export const CreatingCentralFactState: FC = () => {
  const { myPlayer, currentPlayer } = usePlayer();
  const { currentGame } = useGame();
  const { mySubject, changeMySubjectPosition } = useSubject();
  const { currentDice, rollCurrentDice } = useDice();
  const { centralPulse } = useCentralPulse();

  const {
    state: [, state],
  } = currentGame ?? { state: [] };

  const { centralFact, changeCentralFact } = useCentralFact();

  const [s, set] = useStates({
    description: centralFact?.description,
    changingCentralFact: false,
    dicePosition: mySubject?.position ?? null,
    dicePositioned: false,
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

  function handleMapMouseMove(vector: Vector) {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!centralPulse) return;
    if (!currentDice?.value) return;
    if (s.dicePositioned) return;

    s.dicePosition = vector.norm().mult(currentDice.value);
  }

  function handleMapClick() {
    if (!isMyTurn) return;
    if (currentGame && state !== 'update:dice:position') return;
    if (!currentDice) return;
    if (!s.dicePosition) return;

    const { dicePosition } = s;

    s.dicePosition = null;
    s.dicePositioned = true;

    changeMySubjectPosition(dicePosition).catch(alertError);
  }

  function handleDiceRoll() {
    rollCurrentDice().catch(alertError);
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
