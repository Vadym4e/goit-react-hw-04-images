import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import Gallery from './Gallery/Gallery';
import LoadMore from './LoadMore/LoadMore';
import { fetchStartImages, fetchRequestImages } from 'api';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { GlobalStyle } from './GlobalStyle';

const { Component } = require('react');

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    total: 0,
    isLoading: false,
    selectedImage: null,
  };

  async componentDidMount() {
    const imagesList = await fetchStartImages();

    this.setState({
      images: [...imagesList.hits],
      total: imagesList.total,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.LoadImages();
    }
  }

  changeQuery = newQuery => {
    if (newQuery === '') {
      Notiflix.Notify.failure('Please specify your search query.');
    }

    this.setState({ query: `${Date.now()}/${newQuery}`, images: [], page: 1 });
  };

  LoadImages = async () => {
    this.setState({ isLoading: true });

    const normalQuery = this.state.query.slice(14, this.state.query.length);

    await fetchRequestImages(normalQuery, this.state.page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          total: images.total,
          isLoading: false,
        }));
        if (images.total === 0) {
          Notiflix.Notify.failure(
            "We didn't find anything for this search :(  Try another option"
          );
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, isLoading, total, selectedImage } = this.state;
    return (
      <>
        <GlobalStyle />
        <SearchBar search={this.changeQuery} />
        {isLoading && <Loader />}
        <Gallery images={images} onImagesClick={this.handleImageClick} />
        {images.length < total && !isLoading && (
          <LoadMore moreImages={this.loadMoreImages} />
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            onClose={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
