import { faker } from '@faker-js/faker';
import { createRoot } from 'react-dom/client';

import { Game, LightSpot, Subject, SubjectPulse, User } from '@domain/models';

import { Color } from '@domain/enums';

import { App } from '@presentation/app';

import { random, Vector } from './utils';

// ----------------------------------------------------------------------------
console.log('');

const hostUser = new User({ name: 'Lucas' });

console.log('1. INÍCIO DO JOGO');

const game = new Game({ host: hostUser });

const player1 = game.createPlayer({
  name: hostUser.name,
  color: Color.ORANGE,
  user: hostUser,
});

console.log(`    ${player1} entra no jogo e recebe ${player1.dice}`);

const player2 = game.createPlayer({
  name: 'Esther',
  color: Color.CRIMSON,
});

console.log(`    ${player2} entra no jogo e recebe ${player2.dice}`);

const otherUser = new User({ name: 'Davi' });

const player3 = game.createPlayer({
  name: otherUser.name,
  color: Color.BLUE,
  user: otherUser,
});

console.log(`    ${player3} entra no jogo e recebe ${player3.dice}`);

console.log('');

// criação dos elementos ======================================================
console.log('  1.1 CRIAÇÀO DOS ELEMENTOS');
for (const player of game.players) {
  // player cria seu subject --------------------------------------------------
  const subject = player.createSubject({
    description: faker.word.noun(),
  });

  console.log(`    ${player} cria ${subject}`);

  console.log('');
}

// criação do fato central ====================================================
console.log('  1.2 CRIAÇÀO DO FATO CENTRAL');
for (const player of game.players.reverse()) {
  // player adiciona seu subject no centralFact -------------------------------
  game.centralPulse.centralFact.updateDescription(
    `     ${faker.lorem.sentence()}`,
  );

  console.log(`    ${player} atualiza o centralFact com ${player.subject}`);
  console.log(`    "\n${game.centralPulse.centralFact.description}    "`);

  // player rola o dado -------------------------------------------------------
  const value = player.dice.roll();

  console.log(
    `    ${player} rola ${player.dice.toString()} e o resultado é ${value}`,
  );

  // atualiza a quantidade de pulsos do centralPulse --------------------------
  game.centralPulse.updateAmount(value);

  console.log(
    `    ${game.centralPulse} atualiza seus pulsos para ${game.centralPulse.amount}`,
  );

  // atualiza a posição do dice no pulso referente ao valor resultante --------
  const newPosition = Vector.polar(value, random({ max: 2 * Math.PI }));

  player.dice.updatePosition(newPosition);

  console.log(
    `    ${player.dice} reposicionado pra posição ${player.dice.position}`,
  );

  console.log('');
}

console.log('2. DESENVOLVIMENTO');
const lightSpotColors = [Color.GREEN, Color.PURPLE, Color.CYAN];
const lightSpotPlayers = [...game.players];
// eslint-disable-next-line no-constant-condition
while (true) {
  // investigação =============================================================
  console.log('  2.1 INVESTIGAÇÃO');
  for (const player of game.players.reverse()) {
    // player cria um subjectPulse onde seu dice está -------------------------
    if (!player.dice.position) throw 'Dice must be in the map';

    const value = player.dice.roll();

    console.log(`    ${player} rola ${player.dice} e o resultado é ${value}`);

    if (!player.subject) throw 'Player must have a subject';

    player.subject.updatePosition(player.dice.position);

    const subjectPulse = new SubjectPulse({
      origin: player.dice.position,
      gap: random({ min: 0.5, max: 2 }),
      amount: value,
      subject: player.subject,
    });

    console.log(`    ${subjectPulse} criado onde ${player.dice} estava`);

    game.addSubjectPulse(subjectPulse);

    // player muda seu dice de lugar ------------------------------------------
    if (!subjectPulse.lastCircle) throw 'Pulse must have circles';

    // subjectPulse.getAvailableCrossings(game.pulses)
    const crossings = game.getCrossings(subjectPulse, 0.0001);
    const crossing = crossings[random({ max: crossings.length, type: 'int' })];

    player.dice.updatePosition(crossing.position);

    console.log(
      `    ${player.dice} é deslocado pra posição ${
        player.dice.position
      }, cruzamento com ${crossing.scope.join(', ')}`,
    );

    // subject atualiza sua posição pra onde o dice está ----------------------
    player.subject.updatePosition(player.dice.position);

    console.log(
      `    ${player.subject} reposicionado pra posição do ${player.dice}`,
    );

    // player faz uma question onde está --------------------------------------
    const question = player.createQuestion({
      description: faker.lorem.sentence().replace('.', '?'),
      scope: crossing.scope,
    });

    game.addQuestion(question);

    console.log(`    ${player} cria ${question}`);

    console.log('');
  }

  // conjecturas ==============================================================
  console.log('  2.2 CONJECTURAS');
  for (const player of game.players.reverse()) {
    // player escolhe uma pergunta pra responder ------------------------------
    const question =
      game.questions[random({ max: game.questions.length, type: 'int' })];

    // player responde essa pergunta ------------------------------------------
    const answer = question.createAnswer({
      description: faker.lorem.sentence(),
      author: player,
    });

    console.log(`    ${player} responde a ${question} com a ${answer}`);

    // players votam pra decidir se a resposta é um fato ----------------------
    const unanimousDecision = game.players.reduce((decision, votingPlayer) => {
      const agreed =
        votingPlayer.id === player.id ? true : faker.datatype.boolean();

      if (agreed)
        console.log(`    ${votingPlayer} concorda em tornar ${answer} um fato`);
      else
        console.log(`    ${votingPlayer} discorda em tornar ${answer} um fato`);

      return agreed ? decision : false;
    }, true);

    if (unanimousDecision) question.solve(answer);

    if (unanimousDecision)
      console.log(`    por decisão unânime, ${answer} se torna um fato`);
    else
      console.log(
        `    como não houve decisão unânime, ${answer} ainda é uma hipótese`,
      );

    console.log('');
  }

  // ponto de luz =============================================================
  console.log('  2.3 PONTO DE LUZ');

  const lightSpotPlayer = lightSpotPlayers.pop();

  if (!lightSpotPlayer) {
    console.log(
      '    todos os players já criaram lightSpots, então o game está concluiído',
    );

    break;
  }

  const newPosition = Vector(
    random({ min: -5, max: 5 }),
    random({ min: -5, max: 5 }),
  );

  const subject = new Subject({
    description: faker.word.noun(),
    color: lightSpotColors.pop() || Color.GREY,
    position: newPosition,
    author: lightSpotPlayer,
  });

  const lightSpot = new LightSpot({ subject });

  game.addSubjectPulse(lightSpot);

  console.log(`    ${lightSpot} criado por ${lightSpotPlayer}`);

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
