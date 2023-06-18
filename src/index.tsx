/* eslint-disable  */
import { createRoot } from 'react-dom/client';

import {
  Answer,
  Dice,
  Game,
  Landmark,
  Player,
  Pulse,
  Question,
  Subject,
  User,
} from '@domain/models';
import { RichText } from '@domain/models/rich-text';

import { Color } from '@domain/enums';

import { App } from '@presentation/app';

const container = document.getElementById('app');

const lucasUser = User.create({ name: 'Lucas Rezende' }).await();

const game = Game.create({ userID: lucasUser.id }).await();

const lucasPlayer = Player.create({
  name: lucasUser.name,
  color: Color.ORANGE,
  gameID: game.id,
  userID: lucasUser.id,
}).await();

const estherPlayer = Player.create({
  name: 'Esther Rezende',
  color: Color.RED,
  gameID: game.id,
}).await();

const swordSubject = Subject.create({
  description: 'Sword',
  color: lucasPlayer.color,
  playerID: lucasPlayer.id,
}).await();

const glassesSubject = Subject.create({
  description: 'Glasses',
  color: estherPlayer.color,
  playerID: estherPlayer.id,
}).await();

const d4Dice = Dice.create({
  sides: 4,
  value: 2,
  position: [10, 10],
  playerID: lucasPlayer.id,
}).await();

const d6Dice = Dice.create({
  sides: 6,
  value: 5,
  position: [4, -5],
  playerID: estherPlayer.id,
}).await();

const swordLandmark = Landmark.create({ position: d4Dice.position }).await();

const swordPulse = Pulse.create({
  amount: d4Dice.value,
  gap: 20,
  landmarkID: swordLandmark.id,
  subjectID: swordSubject.id,
}).await();

const glassesLandmark = Landmark.create({ position: d6Dice.position }).await();

const glassesPulse = Pulse.create({
  amount: d6Dice.value,
  gap: 20,
  landmarkID: glassesLandmark.id,
  subjectID: glassesSubject.id,
}).await();

console.log({
  users: [lucasUser],
  games: [game],
  players: [lucasPlayer, estherPlayer],
  subjects: [swordSubject, glassesSubject],
  dices: [d4Dice, d6Dice],
  landmarks: [swordLandmark, glassesLandmark],
  pulses: [swordPulse, glassesPulse],
});

const question = Question.create({
  html: '<p>Se ele tinha uma arma, <b>por quê não atirou</b>?</p>',
  landmarkID: swordLandmark.id,
}).await();

const answerRichText = RichText.create({
  content: '<p>O sniper foi <b>mais rápido</b> e o baleou antes</p>',
}).await();
const answer = Answer.create({
  richTextID: answerRichText.id,
  questionID: question.id,
}).await();

answer.update({ isFact: true });

console.log({ question, answer });

const root = createRoot(container);

root.render(<App />);
