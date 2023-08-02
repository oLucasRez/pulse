import { faker } from '@faker-js/faker';
import { createRoot } from 'react-dom/client';

import { Color } from '@domain/enums';

import { App } from '@presentation/app';

import { random, Vector } from './utils';

import {
  createGame,
  createPlayer,
  createSubject,
  createSubjectPulse,
  createUser,
  finishTurn,
  getCentralFact,
  getCrossings,
  getCurrentDice,
  getCurrentPlayer,
  rollCurrentDice,
  startGame,
  updateCentralFactDescription,
  updateCentralPulseAmount,
  updateCurrentDicePosition,
  updateCurrentSubjectPosition,
} from './usecases';

const scope = (a: () => any): any => a();

const user = createUser({ name: 'Lucas' });

const game = createGame(user.id);

createPlayer(game.id, {
  name: user.name,
  color: Color.ORANGE,
  userID: user.id,
});

createPlayer(game.id, {
  name: 'Esther',
  color: Color.CRIMSON,
});

const otherUser = createUser({ name: 'Davi' });

createPlayer(game.id, {
  name: otherUser.name,
  color: Color.BLUE,
  userID: otherUser.id,
});

console.log('1. INÍCIO DO JOGO');

startGame(game.id);

console.log('  1.1 CRIAÇÀO DOS ELEMENTOS'); // ================================
scope(() => {
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  const subject = createSubject(game.id, { description: faker.word.noun() });
  console.log(subject);

  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  const subject = createSubject(game.id, { description: faker.word.noun() });
  console.log(subject);

  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  const subject = createSubject(game.id, { description: faker.word.noun() });
  console.log(subject);

  finishTurn(game.id);
});
console.log('  1.2 CRIAÇÀO DO FATO CENTRAL'); // ==============================
scope(() => {
  // busca o player atual
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  // busca o central-fact
  const centralFact = getCentralFact(game.id);

  // player atualiza o central-fact com sua contribuição
  updateCentralFactDescription(game.id, faker.lorem.sentence());
  console.log(centralFact);

  // busca o dice atual
  let dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  dice = rollCurrentDice(game.id);

  // atualiza o central-pulse com amount referente ao value do dice
  updateCentralPulseAmount(game.id);

  // posiciona o dice ao redor do circle correto
  if (!dice.value) throw 'Dice must have a value';
  const newPosition = Vector.polar(dice.value, random({ max: 2 * Math.PI }));
  updateCurrentDicePosition(game.id, newPosition);

  // posiciona o subject onde o dice está
  updateCurrentSubjectPosition(game.id);

  // passa pro próximo
  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  // busca o player atual
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  // busca o central-fact
  const centralFact = getCentralFact(game.id);

  // player atualiza o central-fact com sua contribuição
  updateCentralFactDescription(
    game.id,
    `${centralFact.description}\n${faker.lorem.sentence()}`,
  );
  console.log(centralFact);

  // busca o dice atual
  let dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  dice = rollCurrentDice(game.id);

  // atualiza o central-pulse com amount referente ao value do dice
  updateCentralPulseAmount(game.id);

  // posiciona o dice ao redor do circle correto
  if (!dice.value) throw 'Dice must have a value';
  const newPosition = Vector.polar(dice.value, random({ max: 2 * Math.PI }));
  updateCurrentDicePosition(game.id, newPosition);

  // posiciona o subject onde o dice está
  updateCurrentSubjectPosition(game.id);

  // passa pro próximo
  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  // busca o player atual
  const currentPlayer = getCurrentPlayer(game.id);
  if (!currentPlayer) throw 'currentPlayer not found';
  console.log(currentPlayer);

  // busca o central-fact
  const centralFact = getCentralFact(game.id);

  // player atualiza o central-fact com sua contribuição
  updateCentralFactDescription(
    game.id,
    `${centralFact.description}\n${faker.lorem.sentence()}`,
  );
  console.log(centralFact);

  // busca o dice atual
  let dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  dice = rollCurrentDice(game.id);

  // atualiza o central-pulse com amount referente ao value do dice
  updateCentralPulseAmount(game.id);

  // posiciona o dice ao redor do circle correto
  if (!dice.value) throw 'Dice must have a value';
  const newPosition = Vector.polar(dice.value, random({ max: 2 * Math.PI }));
  updateCurrentDicePosition(game.id, newPosition);

  // posiciona o subject onde o dice está
  updateCurrentSubjectPosition(game.id);

  // passa pro próximo
  finishTurn(game.id);
});
console.log('2. DESENVOLVIMENTO'); // =========================================
console.log('  2.1 INVESTIGAÇÃO'); // =========================================
scope(() => {
  // busca o dice atual
  const dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  rollCurrentDice(game.id);

  // cria um subject-pulse onde o dice está, com {value} circles
  const randomGap = random({ min: 0.5, max: 2 });
  createSubjectPulse(game.id, randomGap);

  // posiciona o dice em algum cruzamento disponível
  const crossings = getCrossings(game.id);
  console.log(crossings);

  // cria uma question

  // passa pro próximo
  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  // busca o dice atual
  const dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  rollCurrentDice(game.id);

  // cria um subject-pulse onde o dice está, com {value} circles
  const randomGap = random({ min: 0.5, max: 2 });
  createSubjectPulse(game.id, randomGap);

  // posiciona o dice em algum cruzamento disponível
  const crossings = getCrossings(game.id);
  console.log(crossings);

  // cria uma question

  // passa pro próximo
  finishTurn(game.id);
});
// ----------------------------------------------------------------------------
scope(() => {
  // busca o dice atual
  const dice = getCurrentDice(game.id);
  if (!dice) throw 'currentDice not found';

  // rola o dice
  rollCurrentDice(game.id);

  // cria um subject-pulse onde o dice está, com {value} circles
  const randomGap = random({ min: 0.5, max: 2 });
  createSubjectPulse(game.id, randomGap);

  // posiciona o dice em algum cruzamento disponível
  const crossings = getCrossings(game.id);
  console.log(crossings);

  // cria uma question

  // passa pro próximo
  finishTurn(game.id);
});

// console.log('2. DESENVOLVIMENTO');
// const lightSpotColors = [Color.GREEN, Color.PURPLE, Color.CYAN];
// const lightSpotPlayers = [...game.players];
// // eslint-disable-next-line no-constant-condition
// while (true) {
//   // investigação =============================================================
//   console.log('  2.1 INVESTIGAÇÃO');
//   for (const player of game.players.reverse()) {
//     // player cria um subjectPulse onde seu dice está -------------------------
//     if (!player.dice.position) throw 'Dice must be in the map';

//     const value = player.dice.roll();

//     console.log(`    ${player} rola ${player.dice} e o resultado é ${value}`);

//     if (!player.subject) throw 'Player must have a subject';

//     player.subject.updatePosition(player.dice.position);

//     const subjectPulse = new SubjectPulse({
//       origin: player.dice.position,
//       gap: random({ min: 0.5, max: 2 }),
//       amount: value,
//       subject: player.subject,
//     });

//     console.log(`    ${subjectPulse} criado onde ${player.dice} estava`);

//     game.addSubjectPulse(subjectPulse);

//     // player muda seu dice de lugar ------------------------------------------
//     if (!subjectPulse.lastCircle) throw 'Pulse must have circles';

//     // subjectPulse.getAvailableCrossings(game.pulses)
//     const crossings = game.getCrossings(subjectPulse, 0.0001);
//     const crossing = crossings[random({ max: crossings.length, type: 'int' })];

//     player.dice.updatePosition(crossing.position);

//     console.log(
//       `    ${player.dice} é deslocado pra posição ${
//         player.dice.position
//       }, cruzamento com ${crossing.scope.join(', ')}`,
//     );

//     // subject atualiza sua posição pra onde o dice está ----------------------
//     player.subject.updatePosition(player.dice.position);

//     console.log(
//       `    ${player.subject} reposicionado pra posição do ${player.dice}`,
//     );

//     // player faz uma question onde está --------------------------------------
//     const question = player.createQuestion({
//       description: faker.lorem.sentence().replace('.', '?'),
//       scope: crossing.scope,
//     });

//     game.addQuestion(question);

//     console.log(`    ${player} cria ${question}`);

//     console.log('');
//   }

//   // conjecturas ==============================================================
//   console.log('  2.2 CONJECTURAS');
//   for (const player of game.players.reverse()) {
//     // player escolhe uma pergunta pra responder ------------------------------
//     const question =
//       game.questions[random({ max: game.questions.length, type: 'int' })];

//     // player responde essa pergunta ------------------------------------------
//     const answer = question.createAnswer({
//       description: faker.lorem.sentence(),
//       author: player,
//     });

//     console.log(`    ${player} responde a ${question} com a ${answer}`);

//     // players votam pra decidir se a resposta é um fato ----------------------
//     const unanimousDecision = game.players.reduce((decision, votingPlayer) => {
//       const agreed =
//         votingPlayer.id === player.id ? true : faker.datatype.boolean();

//       if (agreed)
//         console.log(`    ${votingPlayer} concorda em tornar ${answer} um fato`);
//       else
//         console.log(`    ${votingPlayer} discorda em tornar ${answer} um fato`);

//       return agreed ? decision : false;
//     }, true);

//     if (unanimousDecision) question.solve(answer);

//     if (unanimousDecision)
//       console.log(`    por decisão unânime, ${answer} se torna um fato`);
//     else
//       console.log(
//         `    como não houve decisão unânime, ${answer} ainda é uma hipótese`,
//       );

//     console.log('');
//   }

//   // ponto de luz =============================================================
//   console.log('  2.3 PONTO DE LUZ');

//   const lightSpotPlayer = lightSpotPlayers.pop();

//   if (!lightSpotPlayer) {
//     console.log(
//       '    todos os players já criaram lightSpots, então o game está concluiído',
//     );

//     break;
//   }

//   const newPosition = Vector(
//     random({ min: -5, max: 5 }),
//     random({ min: -5, max: 5 }),
//   );

//   const subject = new Subject({
//     description: faker.word.noun(),
//     color: lightSpotColors.pop() || Color.GREY,
//     position: newPosition,
//     author: lightSpotPlayer,
//   });

//   const lightSpot = new LightSpot({ subject });

//   game.addSubjectPulse(lightSpot);

//   console.log(`    ${lightSpot} criado por ${lightSpotPlayer}`);

//   console.log('');

//   // verificar sobrecarga =====================================================
//   console.log('  2.4 VERIFICAR SOBRECARGA');
//   // resumo da história =======================================================
//   console.log('  2.5 RESUMO DA HISTÓRIA');
// }

// console.log('3. CONCLUSÃO DE JOGO');

// console.log('');
// // ----------------------------------------------------------------------------
const container = document.getElementById('app');

if (container) {
  const root = createRoot(container);

  root.render(<App />);
}
