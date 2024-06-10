import { Color } from '@domain/enums';

export function getColor(color?: Color | null): string {
  if (!color) return '#757575';

  const map: Record<Color, string> = {
    [Color.RED]: '#FF544B',
    [Color.GREEN]: '#22b122',
    [Color.BLUE]: '#6868e3',
    [Color.CYAN]: '#0ddddd',
    [Color.PURPLE]: '#c636c6',
    [Color.YELLOW]: '#F2BC29',
    [Color.OCHRE]: '#cd7721',
    [Color.ORANGE]: '#ffa110',
    [Color.PINK]: '#f88095',
    [Color.BROWN]: '#b2563d',
    [Color.CRIMSON]: '#d92345',
    [Color.TURQUOISE]: '#18aa9c',
    [Color.BEIGE]: '#dcdcb4',
    [Color.GREY]: '#b7b9c2',
  };

  return map[color];
}
