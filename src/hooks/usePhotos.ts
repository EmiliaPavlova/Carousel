import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface UsePhotosReturn {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  fetchPhotos: () => Promise<void>;
}

const usePhotos = (): UsePhotosReturn => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://picsum.photos/v2/list`);
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    } catch (err) {
      console.log(err);
      setError("Failed to load photos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, fetchPhotos };
};

export default usePhotos;