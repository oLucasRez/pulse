import { FC, ReactNode, useMemo, useState } from 'react';

import { Game, Subject } from '@domain/models';

import { unique } from '@utils';

import { Container } from './styles';

interface AppProps {
  snapshots: {
    game: Game.DTO;
  }[];
}
/**
 * Ponto de partida da aplicação.
 */
const App: FC<AppProps> = ({ snapshots }) => {
  const [i, setI] = useState(0);

  const snapshot = useMemo(() => snapshots[i], [i]);

  function translate(value: number): number {
    return value + 300;
  }

  function scale(value: number): number {
    return value * 20;
  }

  function renderPulses(): ReactNode {
    return snapshot.game.pulses.map((pulse, i) => {
      const color = pulse.color ?? 'gray';

      return (
        <g key={i}>
          {pulse.circles.map((circle, j) => (
            <circle
              key={`${i}:${j}`}
              cx={translate(scale(circle.c.x))}
              cy={translate(scale(circle.c.y))}
              r={scale(circle.r)}
              fill='transparent'
              stroke={color}
            />
          ))}
        </g>
      );
    });
  }

  function renderOrigins(): ReactNode {
    return snapshot.game.pulses.map((pulse, i) => {
      const color = pulse.color ?? 'gray';

      return (
        <circle
          key={i}
          cx={translate(scale(pulse.origin.x))}
          cy={translate(scale(pulse.origin.y))}
          r={3}
          fill={color}
        />
      );
    });
  }

  function renderDices(): ReactNode {
    return snapshot.game.dices.map((dice, i) => {
      if (!dice.position) return null;

      const color = dice.color ?? 'grey';

      return (
        <rect
          key={i}
          style={{ transition: '0.2s' }}
          x={translate(scale(dice.position.x)) - 5}
          y={translate(scale(dice.position.y)) - 5}
          width={10}
          height={10}
          fill={color}
        />
      );
    });
  }

  function renderQuestions(): ReactNode {
    return snapshot.game.questions.map((question, i) => {
      let subjects: Subject.DTO[] = [];

      snapshot.game.subjects.map(
        (subject) =>
          question.scopeIDs.includes(subject.id) && subjects.push(subject),
      );

      subjects = unique(subjects, (a, b) => a.id === b.id);

      if (!question.position) return null;

      return (
        <g key={i}>
          <defs>
            <linearGradient
              id={`gradient${i}`}
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              {subjects.length > 1 ? (
                subjects.map((subject, j) => (
                  <stop
                    key={j}
                    offset={`${(100 * j) / (subjects.length - 1)}%`}
                    stopColor={subject.color}
                  />
                ))
              ) : (
                <>
                  <stop offset='0%' stopColor={subjects[0].color} />
                  <stop offset='100%' stopColor={subjects[0].color} />
                </>
              )}
            </linearGradient>
          </defs>
          <text
            x={translate(scale(question.position.x)) - 4}
            y={translate(scale(question.position.y))}
            stroke='white'
            strokeWidth={2.5}
          >
            ?
          </text>
          <text
            x={translate(scale(question.position.x)) - 4}
            y={translate(scale(question.position.y))}
            fill={`url(#gradient${i})`}
          >
            ?
          </text>
        </g>
      );
    });
  }

  return (
    <Container>
      <button
        onClick={(): any => setI((prevI) => (prevI + 1) % snapshots.length)}
      >
        NEXT
      </button>
      <svg width={600} height={600}>
        {renderPulses()}
        {renderOrigins()}
        {renderDices()}
        {renderQuestions()}
      </svg>
    </Container>
  );
};

export { App };
