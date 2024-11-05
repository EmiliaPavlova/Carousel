import Carousel from './components/Carousel/Carousel'
import usePhotos from './hooks/usePhotos';
import './App.css'

function App() {
  const { photos, loading, error, fetchPhotos } = usePhotos();

  if (error) {
    return <p>{error}</p>;
  };

  return (
    <>
      <Carousel
        images={photos.map((photo) => ({
          id: photo.id,
          url: photo.download_url,
          author: photo.author,
        }))}
        loadMore={fetchPhotos}
        loading={loading}
      />
    </>
  )
}

export default App
