import { selectAllMembers, useAppSelector } from '../../state';
import './PartyMagic.css';

export default function PartyMagic() {
  const members = useAppSelector(selectAllMembers);

  return (
    <div id="magic-container">
      <h3>Magic</h3>
      {members.map(member => (
        <div className="member-magic" key={member.name}>
          <p className={member.magic > 0 ? '' : 'error-text'}>{member.name}</p>
          <progress className="magic-meter" value={member.magic} max={10}></progress>
        </div>
      ))}
    </div>
  );
}
