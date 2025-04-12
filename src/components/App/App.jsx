import { useState, useEffect } from 'react';
import './App.module.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { fetchImagesWithTopic } from '../../unsplash-api';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';


const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');
  
  const handleSearch = async (searchTopic) => {
    if (searchTopic.trim() === '') {
      ErrorMessage("Please enter a search topic !!!");
      return;
    }
    try {
      setImages([]);      
      setLoading(true);
      setTopic(searchTopic);
      const data = await fetchImagesWithTopic(1, 12, searchTopic);
      setImages(data.results);
      setPage(2);
      // console.log('DATA', data);
      // console.log('RESULTS',data.results)
    } catch (err) {      
      ErrorMessage(err.message);
    }
    finally { setLoading(false); }
  }

  const handleLoadMore = async () => {
    if (topic.trim() === '') {
      ErrorMessage("Please enter a search topic !!!");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchImagesWithTopic(page, 12, topic);
      setImages((prevImages) => [...prevImages, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      ErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <Toaster />
      {loading && <Loader />}
      <ImageGallery images={images} />
      {images.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />}
    </div>
  );
};

export default App;
