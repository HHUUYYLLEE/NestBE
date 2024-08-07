const envConfig = () => ({
  port: process.env.PORT,
  randomImagePrefixURL: process.env.RANDOM_IMAGE_PREFIX_URL,
  frontendVercel: process.env.FRONT_END_VERCEL,
});

export default envConfig;
