import React from 'react';

const SearchBar = ({ search }) => {
  return (
    <form
      onSubmit={evt => {
        evt.preventDefault();
        const { value } = evt.target.elements.query;
        search(value);
        evt.target.reset();
        console.log(value);
      }}
    >
      <input type="text" name="query" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
