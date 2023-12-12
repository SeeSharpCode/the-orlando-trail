import './GameStatus.css';

export default function GameStatus({ time }: { time: Date }) {
  return (
    <div id="status-container">
      <h3>Status</h3>
      <p>Main Street USA</p>
      <p>{formatTime(time)}</p>
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
