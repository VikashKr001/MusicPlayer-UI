import React from 'react';
import SongItem from './SongItem';
import './SongList.css';

const SongList = ({ songs, onSongSelect, durations }) => {
  if (!Array.isArray(songs)) {
    return null; // or some appropriate fallback UI
  }

  return (
    <div className="song-list">
      {songs.map(song => (
        <SongItem key={song.id} song={song} onSongSelect={onSongSelect} duration={durations[song.id]} />
      ))}
    </div>
  );
};

export default SongList;
