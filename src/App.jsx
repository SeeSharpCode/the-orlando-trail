import './App.css';
import { useState } from 'react';
import GameGrid from './game/GameGrid';
import { GameProvider } from './app-state/GameContext';
import SetupWizard from './setup/SetupWizard';

export default function App() {
  const [setupComplete, setSetupComplete] = useState(false);

  return (
    <GameProvider>
      <div className="app">{setupComplete ? <GameGrid /> : <SetupWizard setSetupComplete={setSetupComplete} />}</div>
    </GameProvider>
  );
}
