import { Name } from '../types';

interface NameListProps {
  names: Name[];
  onRemoveName: (id: string) => void;
}

export function NameList({ names, onRemoveName }: NameListProps) {
  return (
    <div
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        marginTop: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px'
      }}
    >
      {names.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center' }}>No names added yet</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {names.map((name) => (
            <li
              key={name.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                borderBottom: '1px solid #eee'
              }}
            >
              <span>{name.text}</span>
              <button
                onClick={() => onRemoveName(name.id)}
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
  );
} 