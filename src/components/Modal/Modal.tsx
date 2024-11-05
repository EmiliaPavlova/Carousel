import './Modal.css';

interface ModalProps {
  onClose: () => void;
  image: { url: string; author: string } | null;
}

const Modal: React.FC<ModalProps> = ({ onClose, image }) => {
  if (!image) {
    return null;
  };

  return (
    <div className="modalWrapper" data-testid="modal" onClick={onClose}>
      <div className="modalImageWrapper" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.url}
          alt={image.author}
          className="modalImage"
        />
        <p className="modalTitle">{image.author}</p>
        <button className="modalButton" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
