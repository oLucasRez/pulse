import { AnswerModel } from '@domain/models';
import { IGetAnswerUsecase } from '@domain/usecases';

import { IAnswerDAO } from '@data/dao';
import { AnswerHydrator } from '@data/hydration';
import { FetchAnswerObserver } from '@data/observers';

export class GetAnswerUsecase implements IGetAnswerUsecase {
  private readonly fetchAnswerPublisher: FetchAnswerObserver.Publisher;
  private readonly answerDAO: IAnswerDAO;

  public constructor({ fetchAnswerPublisher, answerDAO }: Deps) {
    this.fetchAnswerPublisher = fetchAnswerPublisher;
    this.answerDAO = answerDAO;
  }

  public async execute(id: string): Promise<AnswerModel | null> {
    const dto = await this.answerDAO.getByID(id);

    const answer = dto ? AnswerHydrator.hydrate(dto) : null;

    this.fetchAnswerPublisher.notifyFetchAnswer(id, answer);

    return answer;
  }
}

type Deps = {
  fetchAnswerPublisher: FetchAnswerObserver.Publisher;
  answerDAO: IAnswerDAO;
};
