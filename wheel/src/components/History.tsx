import { HistoryEntry } from '../types';

interface HistoryProps {
  entries: HistoryEntry[];
}

export function History({ entries }: HistoryProps) {
  return (
    <div style={{ marginTop: '24px' }}>
      <h3 style={{ marginBottom: '8px' }}>History</h3>
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
                <span>{entry.name}</span>
                <span style={{ color: '#666', fontSize: '12px' }}>
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 