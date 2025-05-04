import PriorityQueue from "js-priority-queue";
import { DataSource } from "./interfaces/DataSource";
import { EvictionAlgorithm } from "./models/EvictionAlgorithm";
import { FetchAlgorithm } from "./models/FetchAlgorithm";
import { Record } from "./models/Record";
import { AccessDetails } from "./models/AccessDetails";

export class Cache<TKey, TValue> {
  private cacheMap: Map<TKey, Record<TValue>>;
  private datasource: DataSource<TKey, TValue>;
  private fetchAlgorithm: FetchAlgorithm;
  private evictionAlgorithm: EvictionAlgorithm;
  private expiryTimeInMillis: number;
  private maximumSize: number;
  private expiryQueue: PriorityQueue<{
    expiryTime: number;
    record: Record<TValue>;
  }>;
  private priorityQueue: PriorityQueue<{
    accessDetails: AccessDetails;
    record: Record<TValue>;
  }>;

  constructor(
    datasource: DataSource<TKey, TValue>,
    fetchAlgorithm: FetchAlgorithm = FetchAlgorithm.WRITE_THROUGH,
    evictionAlgorithm: EvictionAlgorithm = EvictionAlgorithm.LRU,
    maximumSize: number,
    expiryTimeInMillis: number
  ) {
    this.cacheMap = new Map();
    this.datasource = datasource;
    this.fetchAlgorithm = fetchAlgorithm;
    this.maximumSize = maximumSize;
    this.evictionAlgorithm = evictionAlgorithm;
    this.expiryTimeInMillis = expiryTimeInMillis;

    this.priorityQueue = new PriorityQueue({
      comparator: (first, second) => {
        const timeDiff =
          first.accessDetails.getLastAccessTime() -
          second.accessDetails.getLastAccessTime();

        if (this.evictionAlgorithm === EvictionAlgorithm.LRU) {
          return timeDiff;
        } else {
          const countDiff =
            first.accessDetails.getAccessCount() -
            second.accessDetails.getAccessCount();
          return countDiff !== 0 ? countDiff : timeDiff;
        }
      },
    });

    this.expiryQueue = new PriorityQueue({
      comparator: (a, b) => a.expiryTime - b.expiryTime,
    });
  }

  public async get(key: TKey): Promise<TValue> {
    let result: Promise<TValue>;
    if (
      this.cacheMap.has(key) &&
      this.cacheMap.get(key)!.getAccessDetails().getLastAccessTime() >=
        Date.now() - this.expiryTimeInMillis
    ) {
      result = Promise.resolve(this.cacheMap.get(key)!.getValue());
    } else {
      const value = await this.datasource.get(key);
      result = this.addToCache(key, new Record(value))!.then(() => value);
    }

    return result.then();
  }

  public async set(key: TKey, value: TValue): Promise<void> {
    const recordValue = new Record<TValue>(value);
    if (!this.cacheMap.has(key) && this.cacheMap.size >= this.maximumSize) {
      // LRU, LFU
      if (this.evictionAlgorithm === EvictionAlgorithm.LRU) {
      } else {
      }
    }

    if (this.fetchAlgorithm == FetchAlgorithm.WRITE_THROUGH) {
      return this.datasource.set(key, value).then(() => {
        this.addToCache(key, recordValue);
        return Promise.resolve();
      });
    } else {
      this.addToCache(key, recordValue);
      this.datasource.set(key, value);

      return Promise.resolve();
    }
  }

  private addToCache(key: TKey, value: Record<TValue>) {
    this.cacheMap.set(key, value);
    return this.cacheMap.get(key);
  }
}
