import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music, X } from "lucide-react";

interface MusicPlayerProps {
  open: boolean;
  playTrigger: boolean;
  onPlayed: () => void;
}

const MusicPlayer = ({ open, playTrigger, onPlayed }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: "Superman", url: "/music/track (2).mp3" },
    { name: "Montegam Xonada", url: "/music/track (1).mp3" },
    { name: "São Paulo", url: "/music/track (3).mp3" },
    { name: "Timeless Guitar", url: "/music/track (4).mp3" },
    { name: "Me and the Devil", url: "/music/track (5).mp3" }
  ];

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Removed auto-play when panel opens to prevent errors with invalid audio files

  useEffect(() => {
    if (playTrigger && !playing) {
      playMusic();
      onPlayed();
    }
  }, [playTrigger, playing]);



  const playMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.error('Error playing audio:', err);
        // Don't set up interaction handlers for invalid audio files
        setPlaying(false);
      }
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMusic = () => {
    playing ? pauseMusic() : playMusic();
  };

  const chooseTrack = (track: typeof tracks[0]) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      playMusic();
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(t => t.name === currentTrack.name);
    const nextIndex = (currentIndex + 1) % tracks.length;
    chooseTrack(tracks[nextIndex]);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleNext}
      />

      {/* Music Panel */}
      <div className={`music-panel ${open ? "show" : ""}`}>
        <div className="music-header">
          <h3>Now Playing</h3>
        </div>

        <div className="current-track">
          <span>{currentTrack.name}</span>
          <button onClick={toggleMusic} className="play-btn">
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        <div className="volume-box">
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
          />
        </div>

        <div className="track-list" style={{ maxHeight: 'none', overflow: 'visible' }}>
          {tracks.map((track, i) => (
            <div
              key={i}
              className={`track-item ${currentTrack.name === track.name ? "active" : ""
                }`}
              onClick={() => chooseTrack(track)}
            >
              {track.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
