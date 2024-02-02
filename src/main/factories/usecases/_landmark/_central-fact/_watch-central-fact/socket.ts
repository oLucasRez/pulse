import { SocketWatchCentralFactUsecase } from '@data/usecases';
import { WatchCentralFactUsecase } from '@domain/usecases';

import {
  makeCentralFactsTableGenerator,
  makeFirebaseSocket,
} from '@main/factories';

export function makeSocketWatchCentralFactUsecase(): WatchCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const socket = makeFirebaseSocket();

  return new SocketWatchCentralFactUsecase({ tableGenerator, socket });
}
