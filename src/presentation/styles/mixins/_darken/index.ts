import * as polished from 'polished';

export function darken(color: string, amount: number): string {
  return polished.darken(amount, color);
}
