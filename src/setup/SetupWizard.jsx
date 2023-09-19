import { useState } from 'react';
import GiftShop from './GiftShop';
import Party from './Party';
import Player, { occupations } from './Player';
import TravelConditions, { travelPaces, travelSeasons } from './TravelConditions';
import { useDispatch } from '../app-state/GameContext';
import { START_GAME } from '../app-state/actions';
import Welcome from './Welcome';

export default function SetupWizard({ setSetupComplete }) {
  const dispatch = useDispatch();

  const [setupStep, setSetupStep] = useState(0);

  // TODO move most of this state to context and dispatch
  // actions from the setup components
  const [occupation, setOccupation] = useState(occupations[0]);

  const [party, setParty] = useState([
    { name: 'Dad', age: 'Adult', magic: 10 },
    { name: 'Dad', age: 'Adykt', magic: 10 },
    { name: 'Nora', age: 'Child', magic: 10 },
  ]);
  const addPartyMember = member => setParty([...party, { ...member, magic: 10 }]);

  const [supplies, setSupplies] = useState({
    snack: { name: 'Snack', unitPrice: 5 },
    waterBottle: { name: 'Water Bottle', unitPrice: 5 },
    sunscreen: { name: 'Sunscreen', unitPrice: 5 },
    sanitizer: { name: 'Hand Sanitizer', unitPrice: 5 },
    tylenol: { name: 'Tylenol', unitPrice: 10 },
    toy: { name: 'Toy', unitPrice: 20 },
    clothes: { name: 'Sets of Clothes', unitPrice: 30, quantity: 2 },
    coolingFan: { name: 'Cooling Fan', unitPrice: 30 },
    batteryPack: { name: 'Battery Pack', unitPrice: 50 },
  });

  const [travelSeason, setTravelSeason] = useState(travelSeasons[0]);
  const [travelPace, setTravelPace] = useState(travelPaces[0]);

  const handleNextStep = () => {
    if (setupStep === 4) {
      dispatch({ type: START_GAME, occupation, party, supplies, travelPace, travelSeason });
      setSetupComplete(true);
    } else {
      setSetupStep(setupStep + 1);
    }
  };
  const handlePreviousStep = () => setSetupStep(setupStep - 1);

  switch (setupStep) {
    case 0:
      return <Welcome onSubmit={handleNextStep} />;
    case 1:
      return (
        <Player
          occupation={occupation}
          setOccupation={setOccupation}
          addPartyMember={addPartyMember}
          handleNextStep={handleNextStep}
        />
      );
    case 2:
      return (
        <Party
          party={party}
          addPartyMember={addPartyMember}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );
    case 3:
      return (
        <GiftShop
          occupation={occupation}
          supplies={supplies}
          setSupplies={setSupplies}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );
    case 4:
      return (
        <TravelConditions
          travelPace={travelPace}
          setTravelPace={setTravelPace}
          travelSeason={travelSeason}
          setTravelSeason={setTravelSeason}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );
  }
}
