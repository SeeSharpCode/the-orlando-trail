import { useState } from 'react';
import './PartyMembers.css';
import TextInput from '../../shared/TextInput';
import { Member, setAllMembers, useAppDispatch } from '../../state';

export default function PartyMembers({ nextStep }: { nextStep: () => void }) {
  const [members, setMembers] = useState<Record<string, Member>>({
    'Adult 1': { id: 'Adult 1', name: 'Adult 1', age: 'Adult', magic: 10 },
    'Adult 2': { id: 'Adult 2', name: 'Adult 2', age: 'Adult', magic: 10 },
    'Child 1': { id: 'Child 1', name: 'Child 1', age: 'Child', magic: 10 },
    'Child 2': { id: 'Child 2', name: 'Child 2', age: 'Child', magic: 10 },
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
            onChange={event => {
              const name = event.target.value;
              setMembers({ ...members, [key]: { ...member, id: `${name}-${member.age}`, name } })
            }}
          />
        </div>
      ))}
      <button
        className="btn-primary"
        onClick={() => {
          dispatch(setAllMembers(Object.values(members)));
          nextStep();
        }}
      >
        OK
      </button>
    </div>
  );
}
