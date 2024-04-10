import { forwardRef, SVGTextElementAttributes } from 'react';

export const Text = forwardRef<
  SVGTextElement,
  SVGTextElementAttributes<SVGTextElement>
>(function Text(props, ref) {
  const { strokeWidth, stroke, ...rest } = props;

  return (
    <>
      {!!strokeWidth && !!stroke && (
        <text
          {...rest}
          fill={stroke}
          stroke={stroke}
          strokeWidth={Number(strokeWidth) * 2}
        />
      )}
      <text ref={ref} {...rest} />
    </>
  );
});
