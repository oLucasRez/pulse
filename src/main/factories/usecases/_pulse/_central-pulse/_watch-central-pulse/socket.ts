import { SocketWatchCentralPulseUsecase } from '@data/usecases';
import { WatchCentralPulseUsecase } from '@domain/usecases';

import { makeCentralPulsesTableGenerator, makeSocket } from '@main/factories';

export function makeSocketWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  const tableGenerator = makeCentralPulsesTableGenerator();
  const socket = makeSocket();

  return new SocketWatchCentralPulseUsecase({ tableGenerator, socket });
}
