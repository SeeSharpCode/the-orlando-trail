import { runLoop, useAppDispatch, useAppSelector } from '../../state';
import './Scene.css';

export default function Scene() {
  const loopInterval = useAppSelector(state => state.game.gameLoopInterval);
  const dispatch = useAppDispatch();

  return (
    <div id="scene-container">
      {loopInterval === 0 ? <button className='btn-secondary' onClick={() => dispatch(runLoop())}>START</button> : ''}
    </div>
  );
}
