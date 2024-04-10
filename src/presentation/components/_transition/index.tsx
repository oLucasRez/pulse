import {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  useEffect,
} from 'react';

import { useStates } from '@presentation/hooks';

import { FadeProps, ScaleProps } from './types';

const Fade: FC<FadeProps> = ({ active, ms, ...props }) => {
  const [s, set] = useStates({
    active,
  });

  useEffect(() => {
    if (active) s.active = true;
    else {
      const timeoutID = setTimeout(set('active', false), ms);

      return () => clearTimeout(timeoutID);
    }
  }, [active, ms]);

  const child = Children.only(props.children);

  if (isValidElement<{ style: CSSProperties }>(child))
    return cloneElement(child, {
      ...child.props,
      style: {
        ...child.props.style,
        transition: `opacity ${ms}ms`,
        opacity: active ? 1 : 0,
      },
    });

  return child;
};

const Scale: FC<ScaleProps> = ({
  active,
  ms,
  inactiveFactor = 1,
  activeFactor = 1,
  ...props
}) => {
  const [s, set] = useStates({
    active,
  });

  useEffect(() => {
    if (active) s.active = true;
    else {
      const timeoutID = setTimeout(set('active', false), ms);

      return () => clearTimeout(timeoutID);
    }
  }, [active, ms]);

  const child = Children.only(props.children);

  if (isValidElement<{ style: CSSProperties }>(child))
    return cloneElement(child, {
      style: {
        transition: `transform ${ms}ms`,
        transform: `scale(${active ? activeFactor : inactiveFactor})`,
        transformOrigin: 'center',
        transformBox: 'border-box',
      },
    });

  return child;
};

export const Transition = {
  Fade,
  Scale,
};
