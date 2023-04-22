import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onOpenModal,
}) => (
  <li className={css.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt=""
      data-source={largeImageURL}
      className={css.ImgGalleryItem}
      onClick={onOpenModal}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
