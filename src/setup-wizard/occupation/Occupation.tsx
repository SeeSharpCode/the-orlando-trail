import { useState } from 'react';
import './Occupation.css';
import { OccupationName, setOccupation, useAppDispatch } from '../../state';

interface Option {
  name: OccupationName;
  description: string;
};

export const options: Option[] = [
  {
    name: 'Stay-at-Home Parent',
    description: 'You are resistant to toddler tantrums but cannot afford napkins.',
  },
  {
    name: 'Teacher',
    description: 'You are resistant to germs but can only travel during the summer.',
  },
  {
    name: 'Undercover Agent',
    description:
      'You work for a rival theme park and could lose instantly if your identity is revealed.',
  },
  {
    name: 'Software Engineer',
    description:
      'You are resistant to mobile app issues, but conversing with humans will drain magic.',
  },
  {
    name: 'Business Executive',
    description:
      'You start with the most cash but have a chance of getting a divorce while waiting in long lines.',
  },
];

export default function Occupation({ nextStep }: { nextStep: () => void }) {
  const [selected, setSelected] = useState<OccupationName | null>(null);
  const dispatch = useAppDispatch();

  return (
    <div id="occupation-container">
      <h3>Choose your occupation</h3>
      <div className="occupation-list">
        {options.map(option => (
          <label key={option.name} className={`occupation-option ${selected === option.name ? 'selected' : ''}`}>
            <input
              type="radio"
              name="occupation"
              value={option.name}
              checked={selected === option.name}
              onChange={() => setSelected(option.name)}
            />
            <div className="occupation-details">
              <div className="occupation-name">{option.name}</div>
              <div className="occupation-description">{option.description}</div>
            </div>
          </label>
        ))}
      </div>
      <button
        className="btn-primary"
        onClick={() => {
          if (selected) {
            dispatch(setOccupation(selected));
            nextStep();
          }
        }}
      >
        OK
      </button>
    </div>
  );
}


