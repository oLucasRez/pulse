export interface AvatarSelectorProps {
  disabled?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?(avatar: string): void;
}

export interface $ContainerProps {
  $disabled?: boolean;
  $readOnly?: boolean;
}
