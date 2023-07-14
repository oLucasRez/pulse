type Options = {
  min?: number;
  max?: number;
  type?: 'int' | 'float';
};

export function random(options: Options = {}): number {
  const { min = 0, max = 1, type = 'float' } = options;

  const floatRandom = min + Math.random() * (max - min);

  if (type === 'float') return floatRandom;
  return Math.floor(floatRandom);
}
