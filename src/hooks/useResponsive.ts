import {useEffect, useState} from 'react';

const useResponsive = () => {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window === 'undefined') {
      return 1220;
    }
    return window.innerWidth;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return {
    isSm: width <= 600,
    isMd: width <= 900,
    isLarge: width <= 1200,
    isExtraLarge: width <= 1536,
  };
};

export default useResponsive;
