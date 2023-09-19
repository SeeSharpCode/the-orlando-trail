import { useEffect, useState } from 'react';
import './Walking.css';
import { useDispatch, useGame } from '../../../app-state/GameContext';
import { arriveAtLand, randomWalkingIncident } from '../../../app-state/lands/walking';

export default function Walking() {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(0);
  const state = useGame();
  const { land, party } = state;

  useEffect(() => {
    const walkingInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);

      // TODO random chance
      if (timer === 5) {
        dispatch(randomWalkingIncident(party));
      }

      if (timer === 10) {
        dispatch(arriveAtLand(land));
        clearInterval(walkingInterval);
      }
    }, 1000);

    return () => clearInterval(walkingInterval);
  }, [dispatch, timer, land, party]);

  return (
    <div id="walking">
      <h3>Walking to {land.name}...</h3>
      <img src="walking-pixel-art.png" width="60%" alt="family walking" />
    </div>
  );
}
