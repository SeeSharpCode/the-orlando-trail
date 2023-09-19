import { useState } from 'react';
import './Party.css';
import SetupStep from './SetupStep';
import TextInput from '../shared/TextInput';

// TODO hardcode this to 2 adults and 2 children for simplicity
export default function Party({ party, addPartyMember, handlePreviousStep, handleNextStep }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('Adult');

  return (
    <SetupStep handlePrevious={handlePreviousStep} handleNext={handleNextStep}>
      <p>Add party member</p>
      <div id="add-member">
        <TextInput label="Name" name="name" value={name} onChange={event => setName(event.target.value)} />
        <select required value={age} onChange={event => setAge(event.target.value)}>
          <option value="Adult">Adult</option>
          <option value="Child">Child</option>
        </select>
        <button type="button" onClick={() => addPartyMember({ name, age })}>
          ADD
        </button>
      </div>
      <fieldset>
        <legend>Party</legend>
        <ul>
          {party.map(member => (
            <li key={member.name}>
              {member.name} ({member.age})
            </li>
          ))}
        </ul>
      </fieldset>
    </SetupStep>
  );
}
