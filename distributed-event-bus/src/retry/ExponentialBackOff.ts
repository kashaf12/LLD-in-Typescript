import { RetryAlgorithm } from "./RetryAlgorithm";

export class ExponentialBackOff<PARAMETER, RESULT> extends RetryAlgorithm<
  PARAMETER,
  RESULT
> {
  constructor(maxAttempts: number) {
    super(maxAttempts, (attempt) => Math.pow(2, attempt) * 1000);
  }
}
