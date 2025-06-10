import { HistoryEntry } from '../types';

interface HistoryProps {
  entries: HistoryEntry[];
  onRemoveEntry: (id: string) => void;
  onClearHistory: () => void;
}

export function History({ entries, onRemoveEntry, onClearHistory }: HistoryProps) {
  return (
    <div style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0 }}>History</h3>
        {entries.length > 0 && (
          <button
            onClick={onClearHistory}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff4444',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '14px'
            }}
          >
            Clear All
          </button>
        )}
      </div>
      <div
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px'
        }}
      >
        {entries.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>No winners yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {entries.map((entry) => (
              <li
                key={entry.id}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{entry.name}</span>
                  <span style={{ color: '#666', fontSize: '12px' }}>
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveEntry(entry.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4444',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 