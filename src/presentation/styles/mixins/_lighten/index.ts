import * as polished from 'polished';

export function lighten(color: string, amount: number): string {
  return polished.lighten(amount, color);
}
