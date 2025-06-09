import { motion } from 'framer-motion';
import type { WheelSegment } from '../types';

interface WheelProps {
  segments: WheelSegment[];
  rotation: number;
  size: number;
}

export function Wheel({ segments, rotation, size }: WheelProps) {
  const center = size / 2;
  const radius = size * 0.45;

  const polarToCartesian = (angle: number, radius: number) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle, radius);
    const end = polarToCartesian(endAngle, radius);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        animate={{ rotate: rotation }}
        transition={{ duration: 5, ease: "easeOut" }}
        style={{ transformOrigin: 'center' }}
      >
        {segments.map((segment) => (
          <path
            key={segment.id}
            d={createArc(segment.startAngle, segment.endAngle)}
            fill={segment.color}
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
        {segments.map((segment) => {
          const angle = (segment.startAngle + segment.endAngle) / 2;
          const textPos = polarToCartesian(angle, radius * 0.75);
          return (
            <text
              key={`text-${segment.id}`}
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="16"
              fontWeight="bold"
              transform={`rotate(${angle + 90}, ${textPos.x}, ${textPos.y})`}
            >
              {segment.name}
            </text>
          );
        })}
      </motion.svg>
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '30px solid #ff0000',
          zIndex: 1
        }}
      />
    </div>
  );
} 