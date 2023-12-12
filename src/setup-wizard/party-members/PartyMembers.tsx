import { useState } from 'react';
import './PartyMembers.css';
import TextInput from '../../shared/TextInput';
import { NewMember, addMember, useAppDispatch } from '../../state';

export default function PartyMembers({ nextStep }: { nextStep: () => void }) {
  const [members, setMembers] = useState<Record<string, NewMember>>({
    'Adult 1': { name: 'Adult 1', age: 'Adult' },
    'Adult 2': { name: 'Adult 2', age: 'Adult' },
    'Child 1': { name: 'Child 1', age: 'Child' },
    'Child 2': { name: 'Child 2', age: 'Child' },
  });

  const dispatch = useAppDispatch();

  return (
    <div id="party-members">
      <h3>Who is in your wagon?</h3>
      {Object.entries(members).map(([key, member]) => (
        <div key={key}>
          <TextInput
            key={key}
            label={key}
            name={key}
            placeholder={key}
            value={member.name}
            onChange={event => setMembers({ ...members, [key]: { ...member, name: event.target.value } })}
          />
        </div>
      ))}
      <button
        className="btn-primary"
        onClick={() => {
          Object.values(members).forEach(m => dispatch(addMember(m)));
          nextStep();
        }}
      >
        OK
      </button>
    </div>
  );
}
