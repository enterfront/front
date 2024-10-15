import React from 'react';

const Search = (props) => {
  return (
      <a className="MyButton search-class mclaren-regular" onClick={() => {
          props.search(props.item);
      }}>Find</a>
  );
};

export default Search;
