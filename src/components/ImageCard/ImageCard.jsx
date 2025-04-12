import styles from './ImageCard.module.css';

const ImageCard = ({ image }) => {
    return (
        <div className={styles.card}>
            <img
                src={image.urls.small}
                alt={image.alt_description || "Unsplash image"}                
            />
        </div>
    );
};

export default ImageCard;