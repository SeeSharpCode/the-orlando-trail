import './App.css';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './state';
import GameGrid from './game/GameGrid';
import Welcome from './setup-wizard/welcome/Welcome';
import PartyMembers from './setup-wizard/party-members/PartyMembers';
import Occupation from './setup-wizard/occupation/Occupation';

export default function App() {
  const [setupStep, setSetupStep] = useState(0);

  const nextStep = () => {
    setSetupStep(setupStep + 1);
  };

  const renderContent = () => {
    switch (setupStep) {
      case 0: {
        return <Welcome nextStep={nextStep} />;
      }
      case 1: {
        return <Occupation nextStep={nextStep} />;
      }
      case 2: {
        return <PartyMembers nextStep={nextStep} />;
      }
      default: {
        return <GameGrid />;
      }
    }
  };

  return (
    <Provider store={store}>
      <div id="main-container">
        <h1>THE ORLANDO TRAIL</h1>
        <div id="app">{renderContent()}</div>
      </div>
    </Provider>
  );
}
