import { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('Please enter your query');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form role="search" onSubmit={handleSubmit} className={css.SearchForm}>
        <input
          placeholder="Search images and photos"
          aria-label="Search"
          onChange={handleChange}
          value={searchQuery}
          autoFocus
          autoComplete="off"
          className={css.SearchForm_input}
        />
        <button type="submit" className={css.SearchForm_button}>
          <span>Click</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
