import './GameGrid.css';
import { Logs } from './logs/Logs';
import Scene from './scene/Scene';
import PartyMagic from './party-magic/PartyMagic';

export default function GameGrid() {
  return (
    <div id="game-grid">
      <div id="left-panel">
        <div>
          <h3>Conditions</h3>
          <p>Main Street USA</p>
          <p>8:00 am</p>
          <p>Hot</p>
        </div>
        <PartyMagic />
      </div>
      <Scene />
      <Logs />
    </div>
  );
}
