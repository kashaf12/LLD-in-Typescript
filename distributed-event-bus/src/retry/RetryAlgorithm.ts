import { RetryAbleException } from "../exception/RetryAbleException";
import { RetryLimitExceededException } from "../exception/RetryLimitExceededException";

export abstract class RetryAlgorithm<PARAMETER, RESULT> {
  constructor(
    private readonly maxAttempts: number,
    private readonly retryTimeCalculator: (attempts: number) => number
  ) {}

  public async attempt(
    task: (parameter: PARAMETER) => Promise<RESULT>,
    parameter: PARAMETER,
    attempts: number = 0
  ): Promise<RESULT> {
    try {
      return await task(parameter);
    } catch (e) {
      if (e instanceof Error && e instanceof RetryAbleException) {
        if (attempts >= this.maxAttempts) {
          throw new RetryLimitExceededException();
        }
        await new Promise((resolve) =>
          setTimeout(resolve, this.retryTimeCalculator(attempts))
        );
        return this.attempt(task, parameter, attempts + 1);
      }
      throw e;
    }
  }
}
