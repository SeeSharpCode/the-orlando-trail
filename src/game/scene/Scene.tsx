import { Member, ParkArea, useMembers, useVisitedAreas } from '../../state';
import './Scene.css';

export default function Scene() {
  const members = useMembers();
  const visitedAreas = useVisitedAreas();

  return <div id="scene-container">{renderScene(visitedAreas, members)}</div>;
}

function renderScene(visitedAreas: ParkArea[], members: Member[]) {
  if (visitedAreas.length === 6) {
    return <p>You win!</p>;
  } else if (members.length === 0) {
    return <img src="leaving.jpg" />;
  } else {
    return <img src="animated-slow.gif" />;
  }
}
