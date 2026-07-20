import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MediaDetail() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/media/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}`);
        }
        return res.json();
      })
      .then(setMedia)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-red-400 p-8">Error: {error}</div>;
  if (!media) return <div className="text-gray-400 p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{media.title}</h1>
        {media.filePath ? (
          <video
            controls
            className="w-full rounded-lg"
            src={`http://localhost:5000/api/media/${id}/stream`}
          />
        ) : (
          <p className="text-gray-400">No video file linked to this title.</p>
        )}
        <p className="text-gray-300 mt-4">{media.description}</p>
      </div>
    </div>
  );
}