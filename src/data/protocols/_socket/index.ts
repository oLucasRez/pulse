export interface SocketProtocol {
  watch<P>(key: string, callback: (snapshot: P) => any): () => void;
}
