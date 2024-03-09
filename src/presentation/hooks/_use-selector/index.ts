import {
  TypedUseSelectorHook,
  useSelector as useDefaultSelector,
} from 'react-redux';

import { RootState } from '@main/store';

export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
