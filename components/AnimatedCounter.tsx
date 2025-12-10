import React, { useEffect, useState } from 'react';
import { AnimatedCounterProps } from '../types';

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const currentCount = from + (to - from) * easeOutExpo(progress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [from, to, duration]);

  // Format number with commas
  const formattedNumber = Math.floor(count).toLocaleString('en-US');

  return (
    <span className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};