import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  triggerKey: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ triggerKey }) => {
  useEffect(() => {
    if (triggerKey > 0) {
      const duration = 6000; // Increased duration to 6 seconds
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        
        // Fireworks effect: shooting up from bottom
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 400); // Less frequent bursts for performance

      // One big center burst to start
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7 },
        // Added #29be91 to the color mix to match the new text color
        colors: ['#5094fb', '#EC4899', '#F59E0B', '#29be91']
      });

      return () => clearInterval(interval);
    }
  }, [triggerKey]);

  return null;
};