import { IWatchSubjectPulsesUsecase } from '@domain/usecases';

import { ISubjectPulseDAO } from '@data/dao';
import { ISubjectPulseHydrator } from '@data/hydration';

export class WatchSubjectPulsesUsecase implements IWatchSubjectPulsesUsecase {
  private readonly subjectPulseDAO: ISubjectPulseDAO;
  private readonly subjectPulseHydrator: ISubjectPulseHydrator;
  public constructor({ subjectPulseDAO, subjectPulseHydrator }: Deps) {
    this.subjectPulseDAO = subjectPulseDAO;
    this.subjectPulseHydrator = subjectPulseHydrator;
  }

  public async execute(
    callback: IWatchSubjectPulsesUsecase.Callback,
  ): Promise<IWatchSubjectPulsesUsecase.Response> {
    const unsubscribe = this.subjectPulseDAO.watch(async (dtos) => {
      const subjectPulses = await Promise.all(
        dtos.map((dto) => this.subjectPulseHydrator.hydrate(dto)),
      );

      callback(subjectPulses);
    });

    return unsubscribe;
  }
}

type Deps = {
  subjectPulseDAO: ISubjectPulseDAO;
  subjectPulseHydrator: ISubjectPulseHydrator;
};
