import styles from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ onLoadMore }) => {
  const handleOnClick = (evt) => {
        evt.preventDefault(); 
        onLoadMore();  
  };

    return (
        <div className={ styles.loadmorebtn}>
            <button onClick={handleOnClick}>Load more</button>
        </div>
  );
};