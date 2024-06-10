export function textOutline(weight: number, color: string): string {
  const outline = [`text-shadow: 0px 0px ${weight}px ${color}`];

  const resolution = 30;

  for (let i = 0; i < resolution; i++)
    outline.push(
      `${weight * Math.cos((i * 2 * Math.PI) / resolution)}px ${
        weight * Math.sin((i * 2 * Math.PI) / resolution)
      }px 0px ${color}`,
    );

  return outline.join(', ') + ';';
}
