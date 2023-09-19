import { useState } from 'react';
import SetupStep from './SetupStep';
import Card from '../shared/Card';

export default function TravelConditions({ handlePreviousStep, handleNextStep }) {
  const [travelSeason, setTravelSeason] = useState(travelSeasons[0]);
  const [travelPace, setTravelPace] = useState(travelPaces[0]);

  return (
    <SetupStep handlePrevious={handlePreviousStep} handleNext={handleNextStep}>
      <div>
        <p>Choose a travel season</p>
        <div className="card-grid">
          {travelSeasons.map(option => (
            <Card
              header={option.name}
              footer={`${option.bonusMultiplier}x bonus`}
              selected={travelSeason.name === option.name}
              key={option.name}
              onClick={() => setTravelSeason(option)}
            >
              <p>{option.description}</p>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <p>Choose a travel pace</p>
        {travelPaces.map(pace => (
          <>
            <label className="choice" key={pace}>
              <input type="radio" name="answer" checked={pace === travelPace} onChange={() => setTravelPace(pace)} />
              <span>{pace}</span>
            </label>
            <br />
          </>
        ))}
      </div>
    </SetupStep>
  );
}

export const travelSeasons = [
  {
    name: 'Winter',
    description: 'Great weather and crowds, but attractions may be down for maintenance.',
    bonusMultiplier: 0,
    temperature: '60F❄️',
  },
  {
    name: 'Spring Break',
    description: 'Kids. Kids everywhere.',
    bonusMultiplier: 1.5,
    temperature: '80F🌴',
  },
  {
    name: 'Summer',
    description: 'Brave the dripping sweat and high crowds for extra bonus points.',
    bonusMultiplier: 2,
    temperature: '95F🥵',
  },
  {
    name: 'Fall',
    description: 'Great weather and crowds, but a hurricane may ruin your trip.',
    bonusMultiplier: 0,
    temperature: '80F🍁',
  },
  {
    name: 'Christmas',
    description: 'Can the holiday spirit get you through wall-to-wall crowds and long lines?',
    bonusMultiplier: 1.5,
    temperature: '75F🎄',
  },
];

export const travelPaces = ['Casual', 'ROPE DROP OR DIE!'];
