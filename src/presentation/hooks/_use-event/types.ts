export type EventHookReturn<F extends (...args: any) => any> = {
  on(callback: F): () => void;
  notify(...args: Parameters<F>): void;
};
