import { ReactNode, Ref } from 'react';

import { Vector, VectorSpace } from '@domain/utils';

export type MapContextValue = {
  mapSpace: VectorSpace;
  bounds: { top: number; left: number; right: number; bottom: number };
  limit: number;
  width: number;
  height: number;
  onMouseMove(callback: (mouse: Vector) => void): () => void;
  onMouseDown(callback: (mouse: Vector) => void): () => void;
  onMouseUp(callback: (mouse: Vector) => void): () => void;
  onClick(callback: (mouse: Vector) => void): () => void;
};

export interface MapProps {
  ref?: Ref<MapContextValue>;
  children?: ReactNode | ((props: MapContextValue) => ReactNode);
  outsideSVG?: boolean;
  onMouseMove?(vector: Vector): void;
  onClick?(): void;
}
