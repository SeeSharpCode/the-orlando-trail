import { useState } from 'react';
import Card from '../shared/Card';
import TextInput from '../shared/TextInput';
import SetupStep from './SetupStep';

export default function Player({ occupation, setOccupation, addPartyMember, handleNextStep }) {
  const [name, setName] = useState('');

  return (
    <SetupStep
      handleNext={() => {
        addPartyMember({ name, age: 'Adult' });
        handleNextStep();
      }}
    >
      <TextInput
        label="Name"
        name="Name"
        placeholder="Player name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="card-grid">
        {occupations.map(o => (
          <Card
            key={o.name}
            header={o.name}
            onClick={() => setOccupation(o)}
            selected={o.name === occupation.name}
            footer={`Cash: $${o.cash}`}
          >
            <p>{o.description}</p>
          </Card>
        ))}
      </div>
    </SetupStep>
  );
}

export const occupations = [
  {
    name: 'Stay-at-Home Parent',
    description: 'You have increased tolerance to child tantrums but cannot afford napkins.',
    cash: 100,
    selected: true,
  },
  {
    name: 'Fitness Instructor',
    description:
      'You have increased tolerance to dehydration and heat stroke but are more likely to suffer from food poisoning.',
    cash: 120,
  },
  {
    name: 'Teacher',
    description: 'You have increased immunity against germs but can only travel during busy school breaks.',
    cash: 150,
  },
  {
    name: 'Undercover Agent',
    description: `You're a spy for a rival theme park and may be kicked out if your identity is compromised.`,
    cash: 200,
  },
  {
    name: 'Software Engineer',
    description: 'You can fix mobile app issues but are more likely to have your magic drained by social interactions.',
    cash: 220,
  },
  {
    name: 'Business Executive',
    description:
      'You start with the most cash but are more likely to have a marriage-ending argument while waiting in lines.',
    cash: 250,
  },
];
