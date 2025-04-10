const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiConfig = {
  baseUrl: `${baseURL}`,
};

export default apiConfig;
