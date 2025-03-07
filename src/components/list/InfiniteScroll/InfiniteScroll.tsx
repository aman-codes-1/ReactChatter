import { memo, useLayoutEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../../hooks';

const InfiniteScroll = ({
  className,
  loadMore,
  hasMore = false,
  onScroll,
  scrollToBottom = false,
  scrollToPosition = false,
  scrollPosition = 0,
  inverse,
  children,
}: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerTarget = useIntersectionObserver<HTMLDivElement>(
    () => {
      if (hasMore) {
        loadMore?.(containerRef);
      }
    },
    undefined,
    [hasMore],
    { root: containerRef?.current, threshold: 0.1 },
  );

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (containerRef?.current) {
        containerRef.current.scrollTop = 0;
      }
    };
    requestAnimationFrame(handleScroll);
  }, [scrollToBottom]);

  useLayoutEffect(() => {
    if (containerRef?.current && scrollPosition) {
      const handleScroll = () => {
        if (containerRef?.current) {
          containerRef.current.scrollTop = scrollPosition;
        }
      };
      requestAnimationFrame(handleScroll);
    }
  }, [scrollToPosition]);

  return (
    <div
      ref={containerRef}
      onScroll={(e) => onScroll?.(e, containerRef)}
      className={className}
      style={
        inverse
          ? {
              display: 'flex',
              flexDirection: 'column-reverse',
              overflowAnchor: 'none',
            }
          : {}
      }
    >
      {children}
      <div ref={observerTarget} style={{ height: '1px' }}>
        &nbsp;
      </div>
    </div>
  );
};

export default memo(InfiniteScroll);
