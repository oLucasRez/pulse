export type Value<S extends object, K extends keyof S> =
  | S[K]
  | ((value: S[K]) => S[K]);
// export type Value<S extends object, K extends keyof S> = S[K];

export interface SetCallback<S extends object> {
  <K extends keyof S>(key: K): (value: Value<S, K>) => void;
  <K extends keyof S>(key: K, value: Value<S, K>): () => void;
}
