import { useState } from 'react';
import { useDispatch, useGame } from '../../../app-state/GameContext';
import './Land.css';
import { lands } from '../../../app-state/lands';
import { changeLand } from '../../../app-state/lands/walking';
import { experienceAttraction } from '../../../app-state/attractions';

export default function Land() {
  const state = useGame();
  const { land } = state;

  return (
    <>
      <h3>Welcome to {land.name}!</h3>
      <p>What would you like to do?</p>
      <Options />
    </>
  );
}

function Options() {
  const state = useGame();
  const { land } = state;
  const [option, setOption] = useState(0);
  const dispatch = useDispatch();

  const options = landOptions(state, land);

  return (
    <div id="options">
      {options.map((choice, i) => (
        <label className="option" key={choice.label}>
          <input type="radio" name="answer" value={options[choice]} onChange={() => setOption(i)} />
          <span>{choice.label}</span>
        </label>
      ))}

      <button
        type="button"
        className="btn-primary"
        onClick={() => {
          dispatch(options[option].action(state));
          setOption(null);
        }}
      >
        OK
      </button>
    </div>
  );
}

function landOptions(state, land) {
  const { submittedOptions, visitedLands } = state;

  const landOptions = land.options ? land.options(state) : [];

  const attractionOptions =
    land.attractions?.map(a => ({
      id: a.name,
      label: a.name,
      action: state => {
        if (a.type.incidents.length > 0 && Math.random() > 0.5) {
          const randomIncident = a.type.incidents[Math.floor(Math.random() * a.type.incidents.length)];
          return randomIncident(a, state.party);
        } else {
          return experienceAttraction(state, a);
        }
      },
    })) ?? [];

  const changeLandOptions = lands
    .filter(l => !visitedLands.includes(l.name))
    .map(land => ({
      label: `Go to ${land.name}`,
      action: () => changeLand(land),
    }));

  const options = [...landOptions, ...attractionOptions, ...changeLandOptions];
  return options.filter(o => !submittedOptions.includes(o.id));
}
