import { ReactNode, Ref } from 'react';

import { Vector, VectorSpace } from '@domain/utils';

export type MapContextValue = {
  mapSpace: VectorSpace;
  bounds: { top: number; left: number; right: number; bottom: number };
  limit: number;
  onMouseMove(callback: (mouse: Vector) => void): () => void;
  onMouseDown(callback: (mouse: Vector) => void): () => void;
  onMouseUp(callback: (mouse: Vector) => void): () => void;
  onClick(callback: (mouse: Vector) => void): () => void;
  openBakingPaper(children: ReactNode): void;
  closeBakingPaper(): void;
};

export interface MapProps {
  ref?: Ref<MapContextValue>;
  children?: ReactNode | ((props: MapContextValue) => ReactNode);
  onMouseMove?(vector: Vector): void;
  onClick?(): void;
}
