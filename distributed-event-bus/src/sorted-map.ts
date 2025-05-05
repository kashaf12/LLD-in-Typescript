interface SortedMapEntry<K, V> {
  key: K;
  value: V;
}

export class SortedMap<K, V> {
  private entries: SortedMapEntry<K, V>[] = [];
  private readonly comparator: (a: K, b: K) => number;

  constructor(comparator: (a: K, b: K) => number) {
    this.comparator = comparator;
  }

  public set(key: K, value: V): void {
    const entry = { key, value };
    const index = this.findInsertIndex(key);
    this.entries.splice(index, 0, entry);
  }

  public get(key: K): V | undefined {
    const index = this.findIndex(key);
    return index >= 0 ? this.entries[index].value : undefined;
  }

  public has(key: K): boolean {
    return this.findIndex(key) >= 0;
  }

  public delete(key: K): boolean {
    const index = this.findIndex(key);
    if (index >= 0) {
      this.entries.splice(index, 1);
      return true;
    }
    return false;
  }

  public size(): number {
    return this.entries.length;
  }

  public entriesArray(): SortedMapEntry<K, V>[] {
    return [...this.entries];
  }

  public keysArray(): K[] {
    return this.entries.map((entry) => entry.key);
  }

  public valuesArray(): V[] {
    return this.entries.map((entry) => entry.value);
  }

  public firstEntry(): SortedMapEntry<K, V> | undefined {
    return this.entries[0];
  }

  public lastEntry(): SortedMapEntry<K, V> | undefined {
    return this.entries[this.entries.length - 1];
  }

  public higherEntry(key: K): SortedMapEntry<K, V> | undefined {
    const index = this.findInsertIndex(key);
    return this.entries[index] || undefined;
  }

  public lowerEntry(key: K): SortedMapEntry<K, V> | undefined {
    const index = this.findInsertIndex(key) - 1;
    return index >= 0 ? this.entries[index] : undefined;
  }

  private findIndex(key: K): number {
    let low = 0;
    let high = this.entries.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const cmp = this.comparator(this.entries[mid].key, key);

      if (cmp === 0) {
        return mid;
      } else if (cmp < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  }

  private findInsertIndex(key: K): number {
    let low = 0;
    let high = this.entries.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const cmp = this.comparator(this.entries[mid].key, key);

      if (cmp < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }
}
