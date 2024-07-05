import React from 'react';

const SongItem = ({ song, onSongSelect, duration }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="song-item" onClick={() => onSongSelect(song)}>
      <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} />
      <div>
        <h4>{song.name}</h4>
        <p>{song.artist}</p>
      </div>
      <span>{duration ? formatDuration(duration) : 'Loading...'}</span>
    </div>
  );
};

export default SongItem;
