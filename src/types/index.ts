export interface Name {
  id: string;
  text: string;
}

export interface HistoryEntry {
  id: string;
  name: string;
  timestamp: string;
}

export interface Theme {
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface WheelSegment {
  id: string;
  name: string;
  color: string;
  startAngle: number;
  endAngle: number;
} 