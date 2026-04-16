export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.endsWith('/') 
      ? process.env.NEXT_PUBLIC_API_URL.slice(0, -1) 
      : process.env.NEXT_PUBLIC_API_URL;
  }
  // Fallback for development
  return "http://localhost:5000";
};

/**
 * Robust fetch that handles non-JSON responses (like HTML error pages)
 */
export const safeFetch = async (endpoint: string, options?: RequestInit) => {
  const API_URL = getApiUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      // console.error("Expected JSON but received non-JSON response:", text.substring(0, 100));
      throw new Error("Received non-JSON response from server. This might be an error page.");
    }
    
    return await response.json();
  } catch (error) {
    // console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
};
