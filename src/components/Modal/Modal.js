import React, { useEffect } from 'react';
import { Overlay } from './Modal.styled';

const Modal = ({ selectedImage, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={selectedImage.largeImageURL} alt="" />
      </div>
    </Overlay>
  );
};

export default Modal;
