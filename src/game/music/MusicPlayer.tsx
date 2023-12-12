import { useRef, useState } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const musicTracks = ['small-world.mp3', 'whole-new-world.mp3'];

  const audioRef = useRef(null);
  const [musicTrack, setMusicTrack] = useState(0);

  const handleNextTrack = () => {
    if (musicTrack < musicTracks.length - 1) {
      setMusicTrack(musicTrack + 1);
    }
  };

  const handlePreviousTrack = () => {
    if (musicTrack > 0) {
      setMusicTrack(musicTrack - 1);
    }
  };

  return (
    <div id="music">
      <h4>
        Tunes by <br />{' '}
        <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@8BitUniverse">
          8 Bit Universe
        </a>
      </h4>
      <audio ref={audioRef} src={`music/${musicTracks[musicTrack]}`} controls />
      <div id="music-buttons">
        <button className="btn-secondary" onClick={handlePreviousTrack}>
          PREV
        </button>
        <button className="btn-secondary" onClick={handleNextTrack}>
          NEXT
        </button>
      </div>
    </div>
  );
}
