import { MouseEventHandler, ReactElement } from 'react';
import './Card.css';

interface CardProps {
  header: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactElement;
  footer: string;
}

export default function Card({ header, selected, onClick, children, footer }: CardProps) {
  return (
    <div className="card" onClick={onClick} style={{ border: selected ? '4px solid var(--primary)' : '' }}>
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
