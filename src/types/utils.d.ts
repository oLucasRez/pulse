type ArrayItem<A extends unknown[]> = A[0];

type Flatten<T> = T extends unknown[] ? T[number] : T;

type Prop<T, K extends string | number | symbol> = T extends {
  [P in K]: infer U;
}
  ? U
  : T;

type GetProp<M, P extends string | number | symbol> = M extends unknown[]
  ? Prop<M[number], P>[]
  : Prop<M, P>;

type GetID<M> = GetProp<M, 'id'>;
