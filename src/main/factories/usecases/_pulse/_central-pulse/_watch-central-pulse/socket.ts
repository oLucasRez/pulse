import { SocketWatchCentralPulseUsecase } from '@data/usecases';
import { WatchCentralPulseUsecase } from '@domain/usecases';

import {
  makeCentralPulsesTableGenerator,
  makeFirebaseSocket,
} from '@main/factories';

export function makeSocketWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const socket = makeFirebaseSocket();

  return new SocketWatchCentralPulseUsecase({ tableGenerator, socket });
}
