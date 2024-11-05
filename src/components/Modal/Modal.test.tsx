import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  const sampleImage = {
    url: 'https://picsum.photos/200/300',
    author: 'Sample Author',
  };
  const onCloseMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when image is null', () => {
    render(<Modal onClose={onCloseMock} image={null} />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true and image is provided', () => {
    render(<Modal onClose={onCloseMock} image={sampleImage} />);
    const imgElement = screen.getByAltText(sampleImage.author);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', sampleImage.url);
    const authorText = screen.getByText(sampleImage.author);
    expect(authorText).toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal content', () => {
    render(<Modal onClose={onCloseMock} image={sampleImage} />);
    const modalWrapper = screen.getByTestId('modal');
    fireEvent.click(modalWrapper);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the modal content', () => {
    render(<Modal onClose={onCloseMock} image={sampleImage} />);
    const modalContent = screen.getByAltText(sampleImage.author);
    fireEvent.click(modalContent);
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls onClose when clicking the close button', () => {
    render(<Modal onClose={onCloseMock} image={sampleImage} />);
    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
