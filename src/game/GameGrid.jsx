import { useEffect, useRef } from 'react';
import LandDetails from './LandDetails';
import './GameGrid.css';
import MainContent from './main-content/MainContent';
import PartyStatus from './PartyStatus';
import { useGame } from '../app-state/GameContext';

export default function GameGrid() {
  return (
    <div id="game-grid">
      <PartyStatus />
      <MainContent />
      <Logs />
      <LandDetails />
    </div>
  );
}

function Logs() {
  const { logs } = useGame();
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  });

  return (
    <div id="logs" ref={logRef}>
      {logs.map((log, i) => (
        <p key={i} className={log.className}>
          {log.message}
        </p>
      ))}
    </div>
  );
}
