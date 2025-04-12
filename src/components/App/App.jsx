import { useState, useEffect } from 'react';
import './App.module.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { Toaster } from 'react-hot-toast';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { fetchImagesWithTopic } from '../../unsplash-api';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';


const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
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

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <Toaster />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal}/>
      {images.length > 0 && !loading && <LoadMoreBtn onLoadMore={handleLoadMore} />}
      <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default App;
