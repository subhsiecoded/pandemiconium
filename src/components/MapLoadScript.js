import { useJsApiLoader } from '@react-google-maps/api';

const LoadScript = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'GOOGLE_MAPS_API', // Replace with your actual API key
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return children;
};

export default LoadScript;