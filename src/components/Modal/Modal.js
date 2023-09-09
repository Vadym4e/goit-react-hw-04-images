import React, { Component } from 'react';
import { Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedImage } = this.props;
    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <div className="modal">
          <img src={selectedImage.largeImageURL} alt="" />
        </div>
      </Overlay>
    );
  }
}

export default Modal;
