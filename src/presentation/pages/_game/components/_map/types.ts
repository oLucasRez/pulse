import { ReactNode, Ref } from 'react';

import { Vector, VectorSpace } from '@domain/utils';

export type MapContextValue = {
  mapSpace: VectorSpace;
  bounds: { top: number; left: number; right: number; bottom: number };
  limit: number;
  width: number;
  height: number;
  onPointerMove(callback: (pointer: Vector) => void): () => void;
  onPointerDown(callback: (pointer: Vector) => void): () => void;
  onPointerUp(callback: (pointer: Vector) => void): () => void;
  onClick(callback: (pointer: Vector) => void): () => void;
};

export type MapPointerEvent = { position: Vector; pointerType: string };

export interface MapProps {
  ref?: Ref<MapContextValue>;
  children?: ReactNode | ((props: MapContextValue) => ReactNode);
  outsideSVG?: boolean;
  overlay?: ReactNode;
  onPointerMove?(event: MapPointerEvent): void;
  onClick?(event: MapPointerEvent): void;
}
