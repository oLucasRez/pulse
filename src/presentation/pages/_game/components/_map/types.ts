import { ReactNode } from 'react';

import { Vector, VectorSpace } from '@domain/utils';

export type MapContextValue = {
  mapSpace: VectorSpace;
};

export interface MapProps {
  children?: ReactNode | ((props: MapContextValue) => ReactNode);
  onMouseMove?(vector: Vector): void;
  onClick?(): void;
}
