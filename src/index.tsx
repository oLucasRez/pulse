import { createRoot } from 'react-dom/client';

import { Game, Landmark, Player, Pulse, Subject, User } from '@domain/models';

import { Color } from '@domain/enums';

import { App } from '@presentation/app';

const container = document.getElementById('app');

const user = User.create({ name: 'Lucas Rezende' }).await();

const game = Game.create({ userID: user.id }).await();

const identifiedPlayer = Player.create({
  name: user.name,
  color: Color.ORANGE,
  gameID: game.id,
  userID: user.id,
}).await();

const anonymousPlayer = Player.create({
  name: 'Esther Rezende',
  color: Color.RED,
  gameID: game.id,
}).await();

const subject1 = Subject.create({
  description: 'Sword',
  color: identifiedPlayer.color,
  playerID: identifiedPlayer.id,
}).await();

const subject2 = Subject.create({
  description: 'Glasses',
  color: anonymousPlayer.color,
  playerID: anonymousPlayer.id,
}).await();

const landmark1 = Landmark.create({ position: [10, 10] }).await();

const pulse1 = Pulse.create({
  amount: 3,
  gap: 20,
  landmarkID: landmark1.id,
  subjectID: subject1.id,
}).await();

const landmark2 = Landmark.create({ position: [4, -5] }).await();

const pulse2 = Pulse.create({
  amount: 3,
  gap: 20,
  landmarkID: landmark2.id,
  subjectID: subject2.id,
}).await();

console.log([pulse1, pulse2]);

const root = createRoot(container);

root.render(<App />);
