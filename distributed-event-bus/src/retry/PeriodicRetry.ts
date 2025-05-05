import { RetryAlgorithm } from "./RetryAlgorithm";

export class PeriodicRetry<PARAMETER, RESULT> extends RetryAlgorithm<
  PARAMETER,
  RESULT
> {
  constructor(maxAttempts: number, waitTimeInMillis: number) {
    super(maxAttempts, () => waitTimeInMillis);
  }
}
