import { Piscina } from "piscina";
// import { hash } from "ohash";
import { createHash } from "node:crypto";

export class KeyedExecutor {
  private readonly pool: Piscina;

  constructor(threads: number) {
    this.pool = new Piscina({
      filename: require.resolve("./worker.js"),
      minThreads: threads,
      maxThreads: threads,
    });
  }

  public async submit(id: string, task: () => Promise<void>): Promise<void> {
    const hashKey = createHash("sha256").update(id).digest("hex");
    await this.pool.run(
      { task: task.toString() },
      { name: hashKey.toString() }
    );
  }

  public async get<T>(id: string, task: () => Promise<T>): Promise<T> {
    // const hashKey = hash(id);
    const hashKey = createHash("sha256").update(id).digest("hex");
    return this.pool.run(
      { task: task.toString() },
      { name: hashKey.toString() }
    );
  }
}
