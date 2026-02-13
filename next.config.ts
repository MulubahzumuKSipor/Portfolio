/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow quality 100 for your profile picture
    qualities: [75, 100],
    // Allow images from Unsplash (used in your seed data) & Supabase
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pkvolophesbswxzjrugk.supabase.co', // Your Supabase Storage
      },
    ],
  },
};

export default nextConfig;
