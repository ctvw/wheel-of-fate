import { useState, useCallback } from 'react';
import type { Name, WheelSegment } from '../types';

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
];

export function useWheelLogic(names: Name[]) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Name | null>(null);

  const generateSegments = useCallback((): WheelSegment[] => {
    const segmentAngle = 360 / names.length;
    return names.map((name, index) => ({
      id: name.id,
      name: name.text,
      color: COLORS[index % COLORS.length],
      startAngle: index * segmentAngle,
      endAngle: (index + 1) * segmentAngle
    }));
  }, [names]);

  const spin = useCallback(() => {
    if (isSpinning || names.length === 0) return;

    // Reset winner state at the start of a new spin
    setWinner(null);
    setIsSpinning(true);
    
    const minRotation = 900;
    const maxRotation = 1800;
    const randomRotation = Math.random() * (maxRotation - minRotation) + minRotation;
    
    // Calculate the new absolute rotation
    const newRotation = rotation + randomRotation;
    setRotation(newRotation);

    // Calculate winner after animation
    setTimeout(() => {
      // Get the final position relative to 12 o'clock
      const finalRotation = newRotation % 360;
      // Convert to clockwise rotation from 12 o'clock
      const normalizedRotation = (360 - finalRotation) % 360;
      const segmentAngle = 360 / names.length;
      const winningIndex = Math.floor(normalizedRotation / segmentAngle);
      const winner = names[winningIndex];
      
      setWinner(winner);
      setIsSpinning(false);
    }, 5000); // Match this with animation duration
  }, [isSpinning, names, rotation]);

  return {
    rotation,
    isSpinning,
    winner,
    spin,
    generateSegments
  };
} 