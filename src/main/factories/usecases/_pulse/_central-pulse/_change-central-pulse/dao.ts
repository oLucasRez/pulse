import { ChangeCentralPulseUsecase } from '@domain/usecases';

import { DAOChangeCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeChangeCentralPulsePublisher,
  makeGetCentralPulseUsecase,
} from '@main/factories';

export function makeDAOChangeCentralPulseUsecase(): ChangeCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const changeCentralPulsePublisher = makeChangeCentralPulsePublisher();
  const getCentralPulse = makeGetCentralPulseUsecase();

  return new DAOChangeCentralPulseUsecase({
    centralPulseDAO,
    changeCentralPulsePublisher,
    getCentralPulse,
  });
}
