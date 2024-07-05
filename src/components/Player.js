import React, { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';
import './Player.css';

const Player = ({ song }) => {
  const coverRef = useRef(null);

  useEffect(() => {
    const fac = new FastAverageColor();
    if (coverRef.current) {
      fac.getColorAsync(coverRef.current)
        .then(color => {
          setBgColor(color.hex);
        })
        .catch(e => {
          console.error('Error extracting color:', e);
        });
    }
  }, [song]);

  return (
    <div className="player" >
      <div className="info">
        <h2>{song.name}</h2>
        <p>{song.artist}</p>
      </div>
      <img
        ref={coverRef}
        src={`https://cms.samespace.com/assets/${song.cover}`}
        alt={song.title}
        className="album-cover"
      />
      <div className="controls">
        <audio src={song.url} controls autoPlay></audio>
      </div>
    </div>
  );
};

export default Player;
