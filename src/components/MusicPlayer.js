import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MusicPlayer.css';
import Header from './Header';
import SearchBar from './SearchBar';
import SongList from './SongList';
import Player from './Player';
import axios from 'axios';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTab, setCurrentTab] = useState('forYou');
  const [durations, setDurations] = useState({});
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Fetch songs from API
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setSongs(response.data.data);
          fetchDurations(response.data.data);
        } else {
          console.error('Unexpected response structure:', response);
        }
      })
      .catch(error => console.error('Error fetching songs:', error));
  }, []);

  const fetchDurations = (songs) => {
    songs.forEach(song => {
      const audio = new Audio(song.url);
      audio.onloadedmetadata = () => {
        setDurations(prevDurations => ({
          ...prevDurations,
          [song.id]: audio.duration
        }));
      };
    });
  };

  const filterSongs = useCallback((query = '') => {
    let filtered = songs;

    if (currentTab === 'topTracks') {
      filtered = filtered.filter(song => song.top_track);
    }

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filtered = filtered.filter(
        song =>
          song.name?.toLowerCase().includes(lowercasedQuery) ||
          song.artist?.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredSongs(filtered);
    if (filtered.length > 0) {
      setCurrentSong(filtered[0]);
    } else {
      setCurrentSong(null);
    }
  }, [songs, currentTab]);

  useEffect(() => {
    filterSongs();
  }, [songs, currentTab, filterSongs]);

  useEffect(() => {
    if (currentSong) {
      const audioElement = audioRef.current;
      audioElement.src = currentSong.url;
      audioElement.load();
      audioElement.onloadedmetadata = () => {
        setDurations(prevDurations => ({
          ...prevDurations,
          [currentSong.id]: audioElement.duration
        }));
      };
    }
  }, [currentSong]);

  const handleSearch = (query) => {
    filterSongs(query);
  };

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="music-player" style={{ backgroundColor: currentSong ? currentSong.accent : 'white' }}>
      <div className="sidebar">
        <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      
      <div className="main-content">
        <span 
          className={currentTab === 'forYou' ? 'active' : ''}
          onClick={() => setCurrentTab('forYou')}
        >
          For You
        </span>
        <span 
          className={currentTab === 'topTracks' ? 'active' : ''}
          onClick={() => setCurrentTab('topTracks')}
        >
          Top Tracks
        </span>
        <div className="tabs-and-search">
          <SearchBar onSearch={handleSearch} backgroundColor={currentSong ? currentSong.accent : 'white'} />
        </div>
        <SongList songs={filteredSongs} onSongSelect={handleSongSelect} durations={durations} />
      </div>
      <div className="player-section">
        {currentSong && <Player song={currentSong} duration={durations[currentSong.id]} />}
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicPlayer;
