import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, backgroundColor }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar" style={{ backgroundColor }}>
      <input
        type="text"
        placeholder="Search Song, Artist" 
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
