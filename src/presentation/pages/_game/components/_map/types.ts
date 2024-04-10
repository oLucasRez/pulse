import { ReactNode } from 'react';

import { Vector, VectorSpace } from '@domain/utils';

export type MapContextValue = {
  mapSpace: VectorSpace;
  bounds: { top: number; left: number; right: number; bottom: number };
  onMouseMove(callback: (mouse: Vector) => void): () => void;
  onMouseDown(callback: (mouse: Vector) => void): () => void;
  onMouseUp(callback: (mouse: Vector) => void): () => void;
  onClick(callback: (mouse: Vector) => void): () => void;
  openPortal(children: ReactNode): void;
  closePortal(): void;
};

export interface MapProps {
  children?: ReactNode | ((props: MapContextValue) => ReactNode);
  onMouseMove?(vector: Vector): void;
  onClick?(): void;
}
