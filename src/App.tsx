import { useState, useEffect } from 'react';
import { Wheel } from './components/Wheel';
import { NameEntry } from './components/NameEntry';
import { NameList } from './components/NameList';
import { History } from './components/History';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useWheelLogic } from './hooks/useWheelLogic';
import type { Name, HistoryEntry } from './types';
import Confetti from 'react-confetti';

function App() {
  const [names, setNames] = useLocalStorage<Name[]>('names', []);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('history', []);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const { rotation, isSpinning, winner, spin, generateSegments } = useWheelLogic(names);

  // Handle winner announcement and effects
  useEffect(() => {
    if (winner) {
      // Clear any existing timeouts
      const timeoutId = setTimeout(() => {
        setShowConfetti(false);
        setIsButtonDisabled(false);
        setAnnouncement(null);
      }, 5000);

      // Show celebration effects
      setShowConfetti(true);
      setAnnouncement(`🎉 ${winner.text} wins! 🎉`);
      setHistory(prev => [
        {
          id: crypto.randomUUID(),
          name: winner.text,
          timestamp: new Date().toISOString()
        },
        ...prev
      ]);
      
      // Disable button during celebration
      setIsButtonDisabled(true);

      // Cleanup timeout on unmount or when winner changes
      return () => clearTimeout(timeoutId);
    }
  }, [winner]);

  const handleAddName = (name: Name) => {
    setNames(prev => [...prev, name]);
  };

  const handleRemoveName = (id: string) => {
    setNames(prev => prev.filter(name => name.id !== id));
  };

  const handleRemoveHistoryEntry = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSpin = () => {
    if (!isButtonDisabled && !isSpinning && names.length > 0) {
      // Clear any existing celebration effects
      setShowConfetti(false);
      setAnnouncement(null);
      spin();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#000000',
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '10px'
        }}>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: 'none',
              cursor: 'pointer',
              color: 'inherit'
            }}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', marginTop: '-20px' }}>
            <h1 style={{ 
              margin: '0 0 15px 0',
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4CAF50, #2196F3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Wheel of Fate
            </h1>
            <Wheel
              segments={generateSegments()}
              rotation={rotation}
              size={600}
            />
            {announcement && (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '20px 0',
                  color: '#4CAF50',
                  animation: 'fadeIn 0.5s ease-in'
                }}
              >
                {announcement}
              </div>
            )}
            <button
              onClick={handleSpin}
              disabled={isButtonDisabled || isSpinning || names.length < 2}
              style={{
                display: 'block',
                margin: '20px auto',
                padding: '12px 24px',
                fontSize: '18px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: isButtonDisabled || isSpinning || names.length < 2 ? '#ccc' : '#4CAF50',
                color: 'white',
                cursor: isButtonDisabled || isSpinning || names.length < 2 ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {isSpinning ? 'Spinning...' : names.length < 2 ? 'Add at least 2 names' : 'Spin!'}
            </button>
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <NameEntry onAddName={handleAddName} isDarkMode={isDarkMode} />
            <NameList names={names} onRemoveName={handleRemoveName} />
            <History 
              entries={history} 
              onRemoveEntry={handleRemoveHistoryEntry}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
