import Modal from 'react-modal';
import { useEffect } from 'react';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >      
      <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
        <img
          src={image?.urls?.regular}
          alt={image?.alt_description}
          draggable={false}
        />
        <button
          onClick={onClose}
          aria-label="Close modal"
          className={styles.invisibleCloseBtn}
        >
          ×
        </button>
      </div>
    </Modal>
  );
};

export default ImageModal;
