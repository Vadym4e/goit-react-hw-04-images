import React from 'react';

const LoadMore = ({ moreImages }) => {
  return (
    <div>
      <button type="button" onClick={moreImages}>
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
