// Centralized API Configuration
// Automatically switches between Localhost (Dev) and VPS (Prod)

const isDev = import.meta.env.DEV;

// Development URL (Dynamically determined)
const getDevUrl = () => {
    // Falls back to localhost if window is undefined [SSR safety, though unrelated here]
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    // Use the same hostname as the frontend, but port 5000 for the backend
    return `http://${hostname}:5000`;
};

// Production URL (VPS IP)
const PROD_URL = 'http://93.127.198.63:5000';

export const API_BASE_URL = isDev ? getDevUrl() : PROD_URL;
export const API_URL = `${API_BASE_URL}/api`;
