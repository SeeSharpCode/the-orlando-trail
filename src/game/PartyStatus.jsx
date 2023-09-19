import { useGame } from '../app-state/GameContext';
import './PartyStatus.css';

export default function PartyStatus() {
  const { occupation, party, faintedParty, supplies } = useGame();

  return (
    <div id="party-status">
      <div>
        <h3>Magic</h3>
        <div className="magic-container">
          {party.map(member => (
            <div className="member-magic" key={member.name}>
              <p>{member.name}</p>
              <progress className="magic-meter" value={member.magic} max={10}></progress>
            </div>
          ))}
          {faintedParty.map(member => (
            <div className="member-magic" key={member.name}>
              <p className="error-text">{member.name}</p>
              <progress className="magic-meter" value={0} max={10}></progress>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Supplies</h3>
        <ul>
          <li>${occupation.cash} Cash</li>
          {Object.values(supplies)
            .filter(item => item.quantity > 0)
            .map(item => (
              <li key={item.name}>
                {item.quantity} {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
