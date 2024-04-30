import { forwardRef, SVGTextElementAttributes } from 'react';

function getOutline(weight: number, color: string) {
  const outline = [`0px 0px ${weight}px ${color}`];

  const resolution = 30;

  for (let i = 0; i < resolution; i++)
    outline.push(
      `${weight * Math.cos((i * 2 * Math.PI) / resolution)}px ${
        weight * Math.sin((i * 2 * Math.PI) / resolution)
      }px 0px ${color}`,
    );

  return outline.join(', ');
}

export const Text = forwardRef<
  SVGTextElement,
  SVGTextElementAttributes<SVGTextElement>
>(function Text({ strokeWidth, stroke, ...props }, ref) {
  return (
    <>
      {!!strokeWidth && !!stroke && (
        <text
          {...props}
          fill={stroke}
          stroke={stroke}
          style={{
            textShadow: getOutline(Number(strokeWidth), stroke),
            ...props.style,
            transformBox: 'content-box',
          }}
        />
      )}
      <text ref={ref} {...props} />
    </>
  );
});
