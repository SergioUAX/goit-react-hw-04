import { FiSearch } from "react-icons/fi";
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	  const topic = form.elements.topic.value;     
    onSearch(topic);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <p>Image finder</p>
      <form onSubmit={handleSubmit}>
        <div>            
            <input            
                type="text"
                name="topic"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
            <button type="submit"><FiSearch/>Search</button>
        </div>
      </form>
    </header>
  );
};