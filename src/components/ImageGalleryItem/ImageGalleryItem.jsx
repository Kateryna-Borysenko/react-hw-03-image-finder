import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => (
  <>
    {images.map(({ id, webformatURL }) => {
      return (
        <li key={id} className="">
          <img src={webformatURL} alt="" className="" />
        </li>
      );
    })}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGalleryItem;
