import { useRef, useEffect, useState, useCallback } from 'react';
import Modal from '../Modal/Modal';
import './Carousel.css';

interface CarouselProps {
  images: {
    id: string;
    url: string;
    author: string;
  }[];
  loadMore: () => void;
  loading: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, loadMore, loading }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    author: string;
  } | null>(null);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        loadMore();
      }
    }
  }, [loadMore]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);

      return () => {
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handleImageClick = (image: { url: string; author: string }) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="carouselWrapper" ref={carouselRef} data-testid="carousel">
        {images.map((image, index) => (
          <div
            key={index}
            className="carouselImageWrapper"
            onClick={() => handleImageClick({ url: image.url, author: image.author })}
          >
            <img
              src={`${image.url}`}
              alt={image.author}
              loading="lazy"
              className="carouselImage"
            />
            <p className="carouselLabel">{image.author}</p>
          </div>
        ))}
        {loading && <p className="carouselLoading">Loading more...</p>}
      </div>

      {isModalOpen && <Modal onClose={closeModal} image={selectedImage} />}
    </>
  );
};

export default Carousel;
