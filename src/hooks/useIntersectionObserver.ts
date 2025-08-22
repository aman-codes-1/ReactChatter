import { DependencyList, useLayoutEffect, useRef } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  onVisible: () => void = () => {},
  onHidden: () => void = () => {},
  deps: DependencyList,
  initValues?: IntersectionObserverInit,
) => {
  const nodeRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    if (!nodeRef?.current) {
      onHidden?.();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        onVisible?.();
      } else {
        onHidden?.();
      }
    }, initValues);

    if (nodeRef?.current) {
      observer?.observe(nodeRef?.current);
    }

    return () => {
      if (nodeRef?.current) {
        observer?.unobserve(nodeRef?.current);
      }
    };
  }, [...deps, onVisible, onHidden, nodeRef?.current]);

  return nodeRef;
};
