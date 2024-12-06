const envConfig = () => ({
  port: process.env.PORT,
  randomImagePrefixURL: process.env.RANDOM_IMAGE_PREFIX_URL,
  frontendVercel: process.env.FRONT_END_VERCEL,
  shazamAPIHost1: process.env.SHAZAM_API_HOST1,
  shazamAPIHost2: process.env.SHAZAM_API_HOST2,
  shazamAPIHost3: process.env.SHAZAM_API_HOST3,
  shazamAPIRoute1: process.env.SHAZAM_API_ROUTE1,
  shazamAPIRoute2: process.env.SHAZAM_API_ROUTE2,
  shazamAPIRoute3: process.env.SHAZAM_API_ROUTE3,
  shazamAPIKey: process.env.SHAZAM_API_KEY
});
export default envConfig;
