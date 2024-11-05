import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Carousel from './Carousel';

describe('Carousel', () => {
  const sampleImages = [
    { id: '1', url: 'https://picsum.photos/200/300', author: 'Author 1' },
    { id: '2', url: 'https://picsum.photos/200/300', author: 'Author 2' },
  ];
  const loadMoreMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders images in the carousel', () => {
    render(<Carousel images={sampleImages} loadMore={loadMoreMock} loading={false} />);
    sampleImages.forEach(image => {
      const imgElement = screen.getByAltText(image.author);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image.url);
    });
  });

  it('calls loadMore when scrolled to the end of the carousel', () => {
    render(<Carousel images={sampleImages} loadMore={loadMoreMock} loading={false} />);
    const carouselWrapper = screen.getByTestId('carousel');
    fireEvent.scroll(carouselWrapper, { target: { scrollLeft: 1000 } });
    expect(loadMoreMock).toHaveBeenCalled();
  });

  it('displays "Loading more..." when loading is true', () => {
    render(<Carousel images={sampleImages} loadMore={loadMoreMock} loading={true} />);
    const loadingText = screen.getByText('Loading more...');
    expect(loadingText).toBeInTheDocument();
  });

  it('opens and closes the modal when an image is clicked', () => {
    render(<Carousel images={sampleImages} loadMore={loadMoreMock} loading={false} />);
    const firstImage = screen.getByAltText(sampleImages[0].author);
    fireEvent.click(firstImage);
    const modalImage = screen.getAllByText(sampleImages[0].author)[1];
    expect(modalImage).toBeInTheDocument();
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(modalImage).not.toBeInTheDocument();
  });
});
