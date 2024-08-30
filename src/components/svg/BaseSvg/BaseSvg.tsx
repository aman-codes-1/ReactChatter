import { memo } from 'react';

const BaseSvg = memo((props: any) => {
  const { id, className, style, fill, width, height } = props;

  return (
    <svg
      style={style}
      className={className}
      fill={fill}
      width={width}
      height={height}
    >
      <use xlinkHref={`/assets/images/vectors.svg#${id}`} />
    </svg>
  );
});

BaseSvg.displayName = 'BaseSvg';

export default BaseSvg;
