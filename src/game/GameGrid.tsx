import { useEffect, useState } from 'react';
import './GameGrid.css';
import PartyMagic from './party-magic/PartyMagic';
import { ParkArea, changeArea, useAppDispatch, useMembers, useParkArea, useVisitedAreas } from '../state';
import randomEvent from '../state/random-event-thunk';
import { Logs } from './logs/Logs';
import Scene from './scene/Scene';

const parkAreas: ParkArea[] = ['Adventureland', 'Frontierland', 'Liberty Square', 'Fantasyland', 'Tomorrowland'];

export default function GameGrid() {
  const [currentTime, setCurrentTime] = useState(new Date(2023, 10, 30, 8, 0, 0));
  const dispatch = useAppDispatch();
  const members = useMembers();
  const parkArea = useParkArea();
  const visitedAreas = useVisitedAreas();

  useEffect(() => {
    if (members.length === 0) return;
    if (visitedAreas.length === 6) return;

    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        const nextTime = new Date(prevTime);
        nextTime.setMinutes(nextTime.getMinutes() + 30);
        return nextTime;
      });

      if (Math.random() < 0.4) {
        dispatch(randomEvent(parkArea));
      }

      if (currentTime.getHours() % 2 === 0 && currentTime.getMinutes() === 0) {
        const unvisitedAreas = parkAreas.filter(area => !visitedAreas.includes(area));
        const nextArea = unvisitedAreas[Math.floor(Math.random() * unvisitedAreas.length)];
        dispatch(changeArea(nextArea));
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentTime, dispatch, members.length, parkArea, setCurrentTime, visitedAreas]);

  return (
    <div id="game-grid">
      <div id="left-panel">
        <div>
          <h3>Location</h3>
          <p>Main Street USA</p>
        </div>
        <div>
          <h3>Time</h3>
          <p>{formatTime(currentTime)}</p>
        </div>
        <PartyMagic />
      </div>
      <Scene />
      <Logs />
    </div>
  );
}

function formatTime(time: Date): string {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
