import { createContext, useContext, useReducer } from 'react';
import { gameReducer } from './game-reducer';
import { occupations } from '../setup/Player';
import { travelPaces, travelSeasons } from '../setup/TravelConditions';
import { mainStreet } from './lands';

const GameContext = createContext(null);
const DispatchContext = createContext(null);

export function useGame() {
  return useContext(GameContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}

const initialState = {
  occupation: occupations[0],
  travelPace: travelPaces[0],
  travelSeason: travelSeasons[0],
  party: [
    { name: 'Tyler', age: 'Adult', magic: 10 },
    { name: 'Tessa', age: 'Adult', magic: 10 },
    { name: 'Nora', age: 'Child', magic: 10 },
    { name: 'Colin', age: 'Child', magic: 10 },
  ],
  faintedParty: [],
  supplies: {
    snack: { name: 'Snack', unitPrice: 5, quantity: 5 },
    waterBottle: { name: 'Water Bottle', unitPrice: 5, quantity: 1 },
    sunscreen: { name: 'Sunscreen', unitPrice: 5, quantity: 0 },
    sanitizer: { name: 'Hand Sanitizer', unitPrice: 5, quantity: 0 },
    tylenol: { name: 'Tylenol', unitPrice: 10, quantity: 0 },
    toy: { name: 'Toy', unitPrice: 20, quantity: 0 },
    clothes: { name: 'Sets of Clothes', unitPrice: 30, quantity: 2 },
    coolingFan: { name: 'Cooling Fan', unitPrice: 30, quantity: 0 },
    batteryPack: { name: 'Battery Pack', unitPrice: 50, quantity: 0 },
  },
  logs: [{ message: 'Welcome to Main Street USA!' }],
  visitedLands: [],
  land: mainStreet,
  submittedOptions: [],
  isWalking: false,
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </GameContext.Provider>
  );
}
