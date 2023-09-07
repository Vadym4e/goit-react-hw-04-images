import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import Gallery from './Gallery/Gallery';
import LoadMore from './LoadMore/LoadMore';
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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      //const imagesList = http zapros
      // this.setState({images: imagesList})
    }
  }

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div>
        <SearchBar search={this.changeQuery} />
        <Gallery />
        <LoadMore moreImages={this.loadMoreImages} />
      </div>
    );
  }
}
