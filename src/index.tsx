import { faker } from '@faker-js/faker';
import { createRoot } from 'react-dom/client';

import { Game, Landmark, SubjectPulse, User } from '@domain/models';

import { Color } from '@domain/enums';

import { App } from '@presentation/app';

import { random, Vector } from './utils';

// ----------------------------------------------------------------------------
console.log('');

const hostUser = new User({ name: 'Lucas' });

console.log('1. INÍCIO DO JOGO');

const game = new Game({ host: hostUser });

const mapWidth = window.innerWidth;
const mapHeight = window.innerHeight;

const player1 = game.createPlayer({
  name: hostUser.name,
  color: Color.ORANGE,
  user: hostUser,
});

console.log(
  `    player "${player1.name}" (de cor ${
    player1.color
  }) entrou no jogo e recebeu o dice ${player1.dice.toString()}`,
);

const player2 = game.createPlayer({
  name: 'Esther',
  color: Color.CRIMSON,
});

console.log(
  `    player "${player2.name}" (de cor ${
    player2.color
  }) entrou no jogo e recebeu o dice ${player2.dice.toString()}`,
);

const otherUser = new User({ name: 'Davi' });

const player3 = game.createPlayer({
  name: otherUser.name,
  color: Color.BLUE,
  user: otherUser,
});

console.log(
  `    player "${player3.name}" (de cor ${
    player3.color
  }) entrou no jogo e recebeu o dice ${player3.dice.toString()}`,
);

console.log('');

// criação dos elementos ======================================================
console.log('  1.1 CRIAÇÀO DOS ELEMENTOS');
for (const player of game.players) {
  // player cria seu subject --------------------------------------------------
  const subject = player.createSubject({
    description: faker.word.noun(),
  });

  console.log(
    `    player ${player.name} cria seu subject "${subject.description}"`,
  );

  console.log('');
}

// criação do fato central ====================================================
console.log('  1.2 CRIAÇÀO DO FATO CENTRAL');
for (const player of game.players.reverse()) {
  // @todo: player adiciona seu subject no centralFact
  console.log(
    `    (todo) player "${player.name}" atualiza o centralFact com seu subject "${player.subject?.description}"`,
  );

  // player rola o dado -------------------------------------------------------
  const randomRollPosition = Vector(
    random({ max: mapWidth }),
    random({ max: mapHeight }),
  );
  const value = player.dice.roll(randomRollPosition);

  console.log(
    `    dice ${player.dice.toString()} do player ${
      player.name
    } pára na posição ${player.dice.position?.toString(
      0,
    )} com resultado ${value}`,
  );

  // player gera os pulsos do seu subject -------------------------------------
  if (!player.dice.position) throw 'Dice must be somewhere in the map';

  const landmark = new Landmark({ position: player.dice.position });

  if (!player.subject) throw 'Player must have a subject';

  const pulse = new SubjectPulse({
    gap: random({ min: 0.5, max: 2 }),
    amount: value,
    landmark,
    subject: player.subject,
  });

  game.addPulse(pulse);

  console.log(
    `    pulse criado na posição ${pulse.origin.toString(0)} com ${
      pulse.amount
    } pulsos pro subject "${pulse.subject.description}"`,
  );

  console.log('');
}

console.log('2. DESENVOLVIMENTO');
for (const lightSpotPlayer of [...game.players].reverse()) {
  // investigação =============================================================
  console.log('  2.1 INVESTIGAÇÃO');
  for (const player of game.players.reverse()) {
    console.log(player.name);

    console.log('');
  }

  // conjecturas ==============================================================
  console.log('  2.2 CONJECTURAS');
  for (const player of game.players.reverse()) {
    console.log(player.name);

    console.log('');
  }

  // ponto de luz =============================================================
  console.log('  2.3 PONTO DE LUZ');
  console.log(lightSpotPlayer.name);

  console.log('');

  // verificar sobrecarga =====================================================
  console.log('  2.4 VERIFICAR SOBRECARGA');
  // resumo da história =======================================================
  console.log('  2.5 RESUMO DA HISTÓRIA');
}

console.log('3. CONCLUSÃO DE JOGO');

console.log('');
// ----------------------------------------------------------------------------
const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
