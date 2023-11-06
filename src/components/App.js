import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import Gallery from './Gallery/Gallery';
import LoadMore from './LoadMore/LoadMore';
import { fetchStartImages, fetchRequestImages } from 'api';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const imagesList = await fetchStartImages();

      setImages(imagesList.hits);
      setTotal(imagesList.total);
    }
    fetchData();
  }, []);
  useEffect(() => {
    LoadImages();
  }, [query, page]);

  const changeQuery = newQuery => {
    if (newQuery === '') {
      Notiflix.Notify.failure('Please specify your search query.');
    }

    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const LoadImages = async () => {
    setIsLoading(true);

    const normalQuery = query.slice(14, query.length);

    await fetchRequestImages(normalQuery, page)
      .then(result => {
        setImages([...images, ...result.hits]);
        setTotal(result.total);
        setIsLoading(false);
        if (images.total === 0) {
          Notiflix.Notify.failure(
            "We didn't find anything for this search :(  Try another option"
          );
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      });
  };

  const loadMoreImages = () => {
    setPage(page + 1);
  };

  const handleImageClick = selectImage => {
    setSelectedImage(selectImage);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <GlobalStyle />
      <SearchBar search={changeQuery} />
      {isLoading && <Loader />}
      <Gallery images={images} onImagesClick={handleImageClick} />
      {images.length < total && !isLoading && (
        <LoadMore moreImages={loadMoreImages} />
      )}
      {selectedImage && (
        <Modal selectedImage={selectedImage} onClose={handleModalClose} />
      )}
    </>
  );
};
