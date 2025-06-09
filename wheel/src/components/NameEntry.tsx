import { useState, KeyboardEvent } from 'react';
import { Name } from '../types';

interface NameEntryProps {
  onAddName: (name: Name) => void;
  isDarkMode?: boolean;
}

export function NameEntry({ onAddName, isDarkMode = false }: NameEntryProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const names = input
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      names.forEach(name => {
        onAddName({
          id: crypto.randomUUID(),
          text: name
        });
      });

      setInput('');
    }
  };

  return (
    <div className="name-entry">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter names (one per line or Shift+Enter for multiple lines)"
        rows={5}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: '14px',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000'
        }}
      />
      <p style={{ 
        fontSize: '12px', 
        color: isDarkMode ? '#999' : '#666', 
        marginTop: '4px' 
      }}>
        Press Enter to add names, Shift+Enter for new line
      </p>
    </div>
  );
} 