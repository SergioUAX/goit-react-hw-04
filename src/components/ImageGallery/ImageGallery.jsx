import ImageCard from "../ImageCard/ImageCard";
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => { 
    return (
        <ul className={styles.gallery}>
            {images.map((image) => (
                <li key={image.id}>
                    <ImageCard image={image} />
                </li>
            ))}
        </ul>
    );
};

