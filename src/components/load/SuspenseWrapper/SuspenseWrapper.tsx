import { lazy, Suspense } from 'react';
import { SuspenseWrapperProps } from './ISuspense';

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
  const { path, compName, fallback, ...rest } = props;
  const LazyComponent = lazy(() =>
    import(`../../../${path}`).then((module: any) => ({
      default: compName ? module[compName] : module.default,
    })),
  );

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...rest} />
    </Suspense>
  );
};

export default SuspenseWrapper;
