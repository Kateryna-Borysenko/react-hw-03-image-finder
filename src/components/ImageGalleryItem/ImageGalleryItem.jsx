import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => {
  images.map(({ id, webformatURL }) => {
    return (
      <li key={id} className="gallery-item">
        <img src={webformatURL} alt="" className="gallery-item-img" />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
export default ImageGalleryItem;
