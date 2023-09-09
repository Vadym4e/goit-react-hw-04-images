import React from 'react';
import { ButtonMore } from './LoadMore.styled';

const LoadMore = ({ moreImages }) => {
  return (
    <ButtonMore type="button" onClick={moreImages}>
      Load more
    </ButtonMore>
  );
};

export default LoadMore;
