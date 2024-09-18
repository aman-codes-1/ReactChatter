import { useLayoutEffect, useState } from 'react';

const TextTransition = ({ children, className }: any) => {
  //   const [visible, setVisible] = useState(true);

  //   useLayoutEffect(() => {
  //     setVisible(false);
  //     const timer = setTimeout(() => {
  //       setVisible(true);
  //     }, 100); // Match the duration of the CSS transition

  //     return () => clearTimeout(timer);
  //   }, [children]);

  return <div className={`${className}`}>{children}</div>;
};

export default TextTransition;
