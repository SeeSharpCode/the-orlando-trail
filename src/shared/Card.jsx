import './Card.css';

export default function Card({ header, selected, onClick, children, footer }) {
  return (
    <div className="card" onClick={onClick} style={{ border: selected && '4px solid var(--primary)' }}>
      <div className="card-header">
        <p>{header}</p>
      </div>
      <div className="card-body">{children}</div>
      <div className="card-footer">
        <p>{footer}</p>
      </div>
    </div>
  );
}
