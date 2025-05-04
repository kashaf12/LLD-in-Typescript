export interface DataSource<Tkey, TValue> {
  get(key: Tkey): Promise<TValue>;
  set(key: Tkey, value: TValue): Promise<void>;
  has(key: Tkey): Promise<boolean>;
}
