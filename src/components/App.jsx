import { useState, useEffect } from 'react';
import { fetchImages } from '../API-key/images-api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('largeImageURLmayBe');

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }

    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (totalHits === 0) {
        alert('Sorry, we do not find images');
      }
      console.log(totalHits, hits);
      const normalizedImages = hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        }
      );
      console.log(hits, totalHits);
      setImages(prevImages => [...prevImages, ...normalizedImages]);
      setLoadMore(page < Math.ceil(totalHits / 12));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const onOpenModal = largeImageURL => {
    console.log(largeImageURL);
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={formSubmit} />
      <Loader isLoading={isLoading} />
      <ImageGallery images={images} onOpenModal={onOpenModal} />
      {loadMore && <Button handleLoadMore={handleLoadMore} page={page} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
