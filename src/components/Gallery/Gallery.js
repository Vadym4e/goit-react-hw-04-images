import React from 'react';

const Gallery = ({ images }) => {
  return (
    <ul>
      {images.map(({ id, webformatURL }) => (
        <li key={id}>
          <img src={webformatURL} alt="img" />
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
