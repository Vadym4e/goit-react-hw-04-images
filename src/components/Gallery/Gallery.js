import React from 'react';
import { Image, Item, List } from './Gallery.styled';

const Gallery = ({ images, onImagesClick }) => {
  return (
    <List>
      {images.map(image => (
        <Item key={image.id}>
          <Image
            src={image.webformatURL}
            alt=""
            onClick={() => onImagesClick(image)}
          />
        </Item>
      ))}
    </List>
  );
};

export default Gallery;
