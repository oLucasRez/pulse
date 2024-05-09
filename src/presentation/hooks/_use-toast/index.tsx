import { useCallback } from 'react';
import { toast, ToastOptions, ToastPosition } from 'react-toastify';

import { DomainError } from '@domain/errors';

import {
  ActionButton,
  Container,
  Content,
  DescriptionContainer,
  IconContainer,
  TitleContainer,
} from './styles';

import { FireOptions, ToastHookReturn, ToastType } from './types';

export function useToast(): ToastHookReturn {
  const fire = useCallback(
    (
      type: ToastType,
      {
        icon,
        title,
        description,
        color,
        step,
        id = Date.now() + '',
        actionLabel,
        action,
      }: FireOptions = {},
    ) => {
      const content = (
        <Container>
          {icon ? (
            <IconContainer>{icon}</IconContainer>
          ) : (
            type === 'tip' && <IconContainer>💡</IconContainer>
          )}
          {(!!title || !!description) && (
            <Content>
              {!!title && <TitleContainer>{title}</TitleContainer>}
              {!!description && (
                <DescriptionContainer>{description}</DescriptionContainer>
              )}
              {actionLabel && action && (
                <ActionButton color={color} onClick={action}>
                  {actionLabel}
                </ActionButton>
              )}
            </Content>
          )}
        </Container>
      );

      const options: ToastOptions = {
        position: (
          {
            notification: 'top-right',
            step: 'bottom-right',
            tip: 'top-center',
          } as Record<ToastType, ToastPosition>
        )[type],
        theme: 'light',
        autoClose: false,
        progress: color ? step && (step >= 1 ? 0.9999 : step) : 0,
        progressStyle: {
          background: color,
        },
        bodyStyle: {
          width: 'fit-content',
        },
        toastId: id,
      };

      if (toast.isActive(id))
        toast.update(id, {
          render: () => content,
          ...options,
        });
      else toast(content, options);
    },
    [],
  );

  const dismiss = useCallback((id: string) => {
    toast.dismiss(id);
  }, []);

  const dismissAll = useCallback(() => {
    toast.dismiss();
  }, []);

  const error = useCallback((error: DomainError) => {
    toast.error(error.message);
  }, []);

  return { fire, dismiss, dismissAll, error };
}
