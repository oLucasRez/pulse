import { SocketWatchCentralFactUsecase } from '@data/usecases';
import { WatchCentralFactUsecase } from '@domain/usecases';

import { makeCentralFactsTableGenerator, makeSocket } from '@main/factories';

export function makeSocketWatchCentralFactUsecase(): WatchCentralFactUsecase {
  const tableGenerator = makeCentralFactsTableGenerator();
  const socket = makeSocket();

  return new SocketWatchCentralFactUsecase({ tableGenerator, socket });
}
