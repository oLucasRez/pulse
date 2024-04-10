import { Vector } from '@domain/utils';

type Return = {
  moveTo(u: Vector, abs?: boolean): Return;
  bezierCurveTo(u: Vector, v: Vector, w: Vector, abs?: boolean): Return;
  toString(): string;
};

export function beginPath(path: string = ''): Return {
  return {
    moveTo(u: Vector, abs?: boolean): Return {
      return beginPath(`${path} ${abs ? 'M' : 'm'}${u.x},${u.y}`);
    },
    bezierCurveTo(u: Vector, v: Vector, w: Vector, abs?: boolean): Return {
      return beginPath(
        `${path} ${abs ? 'C' : 'c'}${u.x},${u.y} ${v.x},${v.y} ${w.x},${w.y}`,
      );
    },
    toString(): string {
      return path;
    },
  };
}
