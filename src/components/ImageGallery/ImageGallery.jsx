import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images }) => (
  <ul className="ImageGallery">
    <ImageGalleryItem images={images} />
  </ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
