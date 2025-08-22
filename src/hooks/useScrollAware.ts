import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollAware = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationFrame = useRef<number | null>(null);

  const onScroll = useCallback((e: any) => {
    if (animationFrame?.current) {
      cancelAnimationFrame(animationFrame?.current);
    }
    animationFrame.current = requestAnimationFrame(() => {
      setScrollTop(e?.target?.scrollTop);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef?.current;
    setScrollTop(scrollContainer?.scrollTop || 0);
    scrollContainer?.addEventListener('scroll', onScroll);
    return () => scrollContainer?.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollRef, scrollTop, setScrollTop };
};
