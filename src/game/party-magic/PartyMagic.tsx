import { useFaintedMembers, useMembers } from '../../state';
import './PartyMagic.css';

export default function PartyMagic() {
  const members = useMembers();
  const faintedMembers = useFaintedMembers();

  return (
    <div id="magic-container">
      <h3>Magic</h3>
      {members.map(member => (
        <div className="member-magic" key={member.name}>
          <p>{member.name}</p>
          <progress className="magic-meter" value={member.magic} max={10}></progress>
        </div>
      ))}
      {faintedMembers.map(member => (
        <div className="member-magic" key={member.name}>
          <p className="error-text">{member.name}</p>
          <progress className="magic-meter" value={0} max={10}></progress>
        </div>
      ))}
    </div>
  );
}
