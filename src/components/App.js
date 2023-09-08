import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import Gallery from './Gallery/Gallery';
import LoadMore from './LoadMore/LoadMore';
import { fetchStartImages, fetchRequestImages } from 'api';
const { Component } = require('react');

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  changeQuery = newQuery => {
    if (newQuery === '') {
      Notiflix.Notify.failure('Please specify your search query.');
    }

    this.setState({ query: `${Date.now()}/${newQuery}`, images: [], page: 1 });
  };

  async componentDidMount() {
    const imagesList = await fetchStartImages();

    this.setState(({ images }) => ({
      images: [...imagesList.hits],
    }));
    // console.log(imagesList);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const normalQuery = this.state.query.slice(14, this.state.query.length);

      const imagesList = await fetchRequestImages(normalQuery, this.state.page);

      this.setState(({ images }) => ({
        images: [...images, ...imagesList.hits],
      }));
      console.log(normalQuery);
      console.log(imagesList);
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <SearchBar search={this.changeQuery} />
        <Gallery images={this.state.images} />
        <LoadMore moreImages={this.loadMoreImages} />
      </div>
    );
  }
}
